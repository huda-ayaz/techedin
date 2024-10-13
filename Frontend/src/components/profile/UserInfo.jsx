import React from "react";
import {
  Avatar,
  Flex,
  Group,
  Text,
  Title,
  Stack,
  Anchor,
  Divider,
} from "@mantine/core";
import { IconBrandGithub, IconEdit } from "@tabler/icons-react";
import { useUser } from "../../UserContext";

const UserInfo = ({ isOwnProfile }) => {
  const interests = ["React", "JavaScript", "Node.js", "CSS", "GitHub"]; // Example interests
  const { user } = useUser();
  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <Stack
      spacing="xs"
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
      mb="sm"
    >
      {/* Terminal Header Image */}
      <div
        style={{
          width: "100%",
          height: "150px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Flex className="p-6" justify="space-between" align="flex-start">
        <Stack spacing="xs" style={{ flex: 1 }}>
          <Group spacing="sm">
            <Avatar color="cyan" radius="100%" size="lg">
              {`${user.first_name[0]}${user.last_name[0]}`}
            </Avatar>
            <div>
              <Flex align="center">
                <Title order={2} className="text-[#333]">
                  {`${user.first_name} ${user.last_name}`}
                </Title>
                <Anchor
                  href={`https://github.com/${user.github_username}`}
                  target="_blank"
                  style={{ marginLeft: "8px" }}
                >
                  <IconBrandGithub color="#2ac808" />
                </Anchor>
              </Flex>
              <Text color="#555" size="sm">
                {user.college}
              </Text>
            </div>
          </Group>
          <Divider my="sm" />
          <Text color="#333" size="sm">
            <strong>Interests:</strong> {user.inputted_interests.join(", ")}
          </Text>
        </Stack>

        {isOwnProfile && (
          <Flex
            direction="column"
            align="flex-end"
            style={{ marginLeft: "20px" }}
          >
            <div
              style={{
                cursor: "not-allowed",
                color: "#2ac808",
                display: "flex",
                alignItems: "center",
                fontSize: "sm",
              }}
            >
              <IconEdit />
              <Text style={{ marginLeft: "4px" }}>Edit</Text>
            </div>
          </Flex>
        )}
      </Flex>
    </Stack>
  );
};

export default UserInfo;
