import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Flex,
  Text,
  Title,
  Paper,
  Stack,
} from "@mantine/core";
import { IconThumbUp } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProjectCard({ project, interestedBool = false }) {
  const [interested, setInterested] = useState(false);
  const [projectOwner, setProjectOwner] = useState();
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `https://techedin-production.up.railway.app/user/${project.project_owner_id}`
        );
        setProjectOwner(response.data);
      } catch (error) {
        console.error("Error fetching project owner details:", error);
      }
    };
    fetchProjectDetails();
  }, [project.project_owner_id]);

  const handleInterestedClick = async () => {
    setInterested(true);
    notifications.show({
      title: "Thank you for expressing interest!",
      message: "The project owner should reach back on your request soon.",
      color: "#2ac808",
    });
    const response = await axios.post(
      "https://techedin-production.up.railway.app/notifications",
      {
        recipient_id: project.project_owner_id,
        sender_id: user.user.id,
        time_stamp: new Date().toISOString(),
        project_id: project.id,
        type: "interested",
      }
    );
    console.log("Notification Created: ", response.data);
  };
  if (!user) {
    return <div>Loading user information...</div>;
  }
  return (
    <div>
      <Paper
        className="w-full"
        shadow="sm"
        p="xl"
        direction="column"
        mt="sm"
        overflow="auto"
        radius="md"
      >
        <Group align="center" className="mb-2">
          <Avatar
            src="https://images.unsplash.com/photo-1556740737-768f5f9f9e79" // replace with user.user.photo from context
            alt="Profile picture"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          />
          <Flex direction="column" gap={0}>
            <Text size="md" fw="bolder" color="#2ac808">
              {`${projectOwner?.first_name} ${
                projectOwner?.last_name
              } • ${new Date(project?.time_posted).toLocaleString()}`}
            </Text>{" "}
            <Text size="sm">{user.user.college}</Text>{" "}
          </Flex>
        </Group>
        <Stack>
          <Title order={2} className="text-[#2ac808]">
            {project.project_title}
          </Title>
          <div>
            <Text>{project.project_description}</Text>
          </div>
        </Stack>
        <Group align="center" mt="10">
          <Title order={6}>Tags: </Title>
          {project.project_categories.map((category) => {
            return (
              <Badge color="#2ac808" key={category}>
                {category}
              </Badge>
            );
          })}

          {/* replace with project.tags from context */}
        </Group>
        <Card justify="center" shadow="xl" className="border-2 mt-2" p="sm">
          <Group spacing="md">
            <div className="w-40 h-40 overflow-hidden">
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub link preview"
                fit="contain"
                className="w-full h-full"
              />
            </div>
            <Stack>
              <Text weight={500} mt="md">
                GitHub Repository
              </Text>{" "}
              {/* replace with project.name from GitHub */}
              <Text size="sm" color="dimmed">
                {project.project_description}
              </Text>{" "}
              {/* replace with project.description from GitHub */}
              <Button
                variant="light"
                color="#2ac808"
                fullWidth
                mt="md"
                component="a"
                href={project.project_link}
                target="_blank"
              >
                View on GitHub
              </Button>
            </Stack>
          </Group>
        </Card>
        {interestedBool ? (
          ""
        ) : (
          <Group mt="sm">
            <Button
              variant="light"
              color="#2ac808"
              onClick={handleInterestedClick}
              disabled={interested || interestedBool}
            >
              <IconThumbUp stroke={2} className="mr-2" />
              {interested || interestedBool
                ? "Pending approval from project owner."
                : "I'm Interested"}
            </Button>
          </Group>
        )}
      </Paper>
    </div>
  );
}
