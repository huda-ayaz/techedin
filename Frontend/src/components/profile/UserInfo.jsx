import React from "react";
import { Avatar, Flex, Text, Title, Anchor } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

const UserInfo = () => {
  return (
    <Flex justify="flex-start" align="center" gap="30px">
      <Avatar color="cyan" radius="100%" size="xl">
        JD
      </Avatar>
      <div>
        <Title order={1}>John Doe</Title>
        <Text>Brooklyn College</Text>
        <Anchor href="https://github.com/" target="_blank">
          <Flex align="center">
            <IconBrandGithub style={{ marginRight: "5px" }} />
            GitHub
          </Flex>
        </Anchor>
      </div>
    </Flex>
  );
};

export default UserInfo;
