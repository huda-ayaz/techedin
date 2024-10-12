import React from "react";
import {
  Flex,
  Avatar,
  Button,
  Paper,
  Stack,
  TextInput,
  Textarea,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUser } from "../UserContext";

const CreatePost = () => {
  const { user } = useUser();
  const form = useForm({
    initialValues: {
      project: "",
      description: "",
      categories: [],
      url: "",
    },
    validate: {
      project: (value) => (value ? null : "Project title is required"),
      description: (value) =>
        value ? null : "Project description is required",
      categories: (value) =>
        value.length > 0 ? null : "Please select at least one category",
      url: (value) =>
        value === "" ||
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/.test(
          value
        )
          ? null
          : "Invalid URL",
    },
  });

  const handleSubmit = (values) => {
    console.log("Submitted Data:", values);
  };
  if (!user) {
    return <div>Loading user information...</div>;
  }
  return (
    <Paper p="lg" radius="none">
      <Flex justify="flex-start" gap="30px" align="center">
        <Avatar color="cyan" radius="100%" size="lg">
          {`${user.firstName[0]}${user.lastName[0]}`}
        </Avatar>
        <Stack className="w-full">
          <TextInput
            placeholder="Enter project title"
            {...form.getInputProps("project")}
            styles={{
              input: {
                fontSize: "1.5em",
                border: "none",
                borderBottom: "1px solid #ccc",
                borderRadius: 0,
                padding: "0.5em 0",
              },
            }}
          />
        </Stack>
      </Flex>
      <Stack mt="md" spacing="xs">
        <Textarea
          placeholder="Share an idea to find your dream team..."
          {...form.getInputProps("description")}
          styles={{
            input: {
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: 0,
              padding: "0.5em 0",
            },
          }}
        />
        <MultiSelect
          placeholder="Tag relevant categories"
          data={["React", "Angular", "Vue", "Svelte"]}
          {...form.getInputProps("categories")}
          styles={{
            input: {
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: 0,
              padding: "0.5em 0",
            },
          }}
        />
        <TextInput
          placeholder="Project URL"
          {...form.getInputProps("url")}
          styles={{
            input: {
              border: "none",
              borderBottom: "1px solid #ccc",
              borderRadius: 0,
              padding: "0.5em 0",
            },
          }}
        />
      </Stack>
      <Flex justify="flex-end" mt="md">
        <Button
          type="submit"
          radius="xl"
          color="#2ac808"
          onClick={form.onSubmit(handleSubmit)}
        >
          Share
        </Button>
      </Flex>
    </Paper>
  );
};

export default CreatePost;
