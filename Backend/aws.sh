#!/bin/bash

# Set AWS and project variables
AWS_REGION="us-east-2"
AWS_ACCOUNT_ID="378734271955"
PROJECT_NAME="match-maker"
DOCKER_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}:latest"
SUPABASE_URL="<your_supabase_url>" # Replace with your actual Supabase URL
SUPABASE_KEY="<your_supabase_key>" # Replace with your actual Supabase Key

# Check for necessary dependencies
command -v aws >/dev/null 2>&1 || { echo "AWS CLI is required but not installed. Aborting." >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo "Terraform is required but not installed. Aborting." >&2; exit 1; }

# Step 1: Set up AWS SSM Parameters for environment variables
echo "Storing environment variables in AWS SSM Parameter Store..."
aws ssm put-parameter --name "SUPABASE_URL" --value "${SUPABASE_URL}" --type "String" --overwrite --region ${AWS_REGION}
aws ssm put-parameter --name "SUPABASE_KEY" --value "${SUPABASE_KEY}" --type "String" --overwrite --region ${AWS_REGION}

# Step 2: Create the ECR repository if it doesn't already exist
echo "Creating ECR repository if it doesn't exist..."
aws ecr describe-repositories --repository-name "${PROJECT_NAME}" --region ${AWS_REGION} > /dev/null 2>&1

if [ $? -ne 0 ]; then
  aws ecr create-repository --repository-name "${PROJECT_NAME}" --region ${AWS_REGION}
else
  echo "ECR repository ${PROJECT_NAME} already exists."
fi

# Step 3: Log in to ECR
echo "Logging into Amazon ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Step 4: Build, Tag, and Push the Docker image
echo "Building the Docker image..."
docker build -t ${PROJECT_NAME} .

echo "Tagging the Docker image..."
docker tag ${PROJECT_NAME}:latest ${DOCKER_IMAGE}

echo "Pushing the Docker image to ECR..."
docker push ${DOCKER_IMAGE}

# Step 5: Initialize and Apply Terraform
echo "Initializing and applying Terraform..."
cat > main.tf <<EOF
provider "aws" {
  region = "${AWS_REGION}"
}

resource "aws_ecr_repository" "${PROJECT_NAME}" {
  name = "${PROJECT_NAME}"
  force_delete = true
}

resource "aws_ssm_parameter" "supabase_url" {
  name  = "SUPABASE_URL"
  type  = "String"
  value = "${SUPABASE_URL}"
}

resource "aws_ssm_parameter" "supabase_key" {
  name  = "SUPABASE_KEY"
  type  = "String"
  value = "${SUPABASE_KEY}"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_vpc" "${PROJECT_NAME}_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.${PROJECT_NAME}_vpc.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.${PROJECT_NAME}_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.${PROJECT_NAME}_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${AWS_REGION}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.${PROJECT_NAME}_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${AWS_REGION}b"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "ecs_sg" {
  name        = "ecs_sg"
  description = "Allow HTTP traffic on port 8080"
  vpc_id      = aws_vpc.${PROJECT_NAME}_vpc.id
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_cluster" "${PROJECT_NAME}_cluster" {
  name = "${PROJECT_NAME}-cluster"
}

resource "aws_ecs_task_definition" "${PROJECT_NAME}_task" {
  family                   = "${PROJECT_NAME}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name      = "${PROJECT_NAME}"
    image     = "${DOCKER_IMAGE}"
    essential = true
    portMappings = [{
      containerPort = 8080
      hostPort      = 8080
      protocol      = "tcp"
    }]
    environment = [
      { name = "SUPABASE_URL", value = aws_ssm_parameter.supabase_url.value },
      { name = "SUPABASE_KEY", value = aws_ssm_parameter.supabase_key.value }
    ]
  }])
}

resource "aws_ecs_service" "${PROJECT_NAME}_service" {
  name            = "${PROJECT_NAME}-service"
  cluster         = aws_ecs_cluster.${PROJECT_NAME}_cluster.id
  task_definition = aws_ecs_task_definition.${PROJECT_NAME}_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets         = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}
EOF

# Initialize and Apply Terraform Configuration
terraform init
terraform apply -auto-approve

echo "Deployment complete. Your app should be accessible at the ECS public IP on port 8080."
