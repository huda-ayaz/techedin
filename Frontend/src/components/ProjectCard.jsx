import React, { useState } from "react";
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

export default function ProjectCard() {
  const [interested, setInterested] = useState(false);

  const handleInterestedClick = () => {
    setInterested(true);
    notifications.show({
      title: "Thank you for expressing interest!",
      message: "The project owner should reach back on your request soon.",
    });
  };

  return (
    <div>
      <Paper
        className="w-full"
        shadow="sm"
        p="xl"
        direction="column"
        mt="sm"
        overflow="auto"
      >
        <Group align="center" className="mb-2">
          <Avatar
            component="a"
            src="https://images.unsplash.com/photo-1556740737-768f5f9f9e79" // replace with user.photo from context
            href="profile" // replace with user.profile from context
            target="_blank"
            alt="Profile picture"
          />
          <Flex direction="column" gap={0}>
            <Text size="md" fw="bolder" color="#2ac808">
              John Doe • 1 hr ago
            </Text>{" "}
            <Text size="sm">Harvard University</Text>{" "}
            {/* replace with user.name and college from context */}
          </Flex>
        </Group>
        <Stack>
          <Title order={2} className="text-[#2ac808]">
            Project Title
          </Title>
          <div>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              exercitationem inventore corporis, libero eius similique,
              perspiciatis quos nihil officiis quis aut necessitatibus! Ipsam
              minus culpa et deserunt odio sunt sed, eveniet ducimus quisquam
              excepturi officia, assumenda earum consequuntur tempora odit.
            </Text>
          </div>
        </Stack>
        <Group align="center" mt="10">
          <Title order={6}>Tags: </Title>
          <Badge color="#2ac808">React</Badge>{" "}
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
                A brief description of the GitHub project.
              </Text>{" "}
              {/* replace with project.description from GitHub */}
              <Button
                variant="light"
                color="#2ac808"
                fullWidth
                mt="md"
                component="a"
                href="https://github.com/user/repo"
                target="_blank"
              >
                View on GitHub
              </Button>
            </Stack>
          </Group>
        </Card>
        <Group mt="sm">
          <Button
            variant="light"
            color="#2ac808"
            onClick={handleInterestedClick}
            disabled={interested}
          >
            <IconThumbUp stroke={2} className="mr-2" />
            {interested
              ? "Pending approval from project owner."
              : "I'm Interested"}
          </Button>
        </Group>
      </Paper>
    </div>
  );
}
