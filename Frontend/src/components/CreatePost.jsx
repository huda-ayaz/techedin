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
import axios from "axios";

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
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/.test(
          value
        )
          ? null
          : "Invalid URL",
    },
  });

  const handleSubmit = async (values) => {
    const projectData = {
      project_owner_id: user.id,
      project_title: values.project,
      project_description: values.description,
      project_link: values.url,
      project_categories: values.categories,
      time_posted: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "https://techedin-production.up.railway.app/projects",
        projectData
      );
      console.log(response.data);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) {
    return <div>Loading user information...</div>;
  }
  return (
    <Paper p="lg" radius="xl">
      <Flex justify="flex-start" gap="30px" align="center">
        <Avatar color="cyan" radius="100%" size="lg">
          {`${user.first_name[0]}${user.last_name[0]}`}
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
