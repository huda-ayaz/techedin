provider "aws" {
  region = "us-east-2"
}

resource "aws_ecr_repository" "match-maker" {
  name = "match-maker"
  force_delete = true
}

resource "aws_ssm_parameter" "supabase_url" {
  name  = "SUPABASE_URL"
  type  = "String"
  value = "<your_supabase_url>"
}

resource "aws_ssm_parameter" "supabase_key" {
  name  = "SUPABASE_KEY"
  type  = "String"
  value = "<your_supabase_key>"
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

resource "aws_vpc" "match-maker_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.match-maker_vpc.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.match-maker_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.match-maker_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-2a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.match-maker_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-2b"
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
  vpc_id      = aws_vpc.match-maker_vpc.id
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

resource "aws_ecs_cluster" "match-maker_cluster" {
  name = "match-maker-cluster"
}

resource "aws_ecs_task_definition" "match-maker_task" {
  family                   = "match-maker-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name      = "match-maker"
    image     = "378734271955.dkr.ecr.us-east-2.amazonaws.com/match-maker:latest"
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

resource "aws_ecs_service" "match-maker_service" {
  name            = "match-maker-service"
  cluster         = aws_ecs_cluster.match-maker_cluster.id
  task_definition = aws_ecs_task_definition.match-maker_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets         = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}
