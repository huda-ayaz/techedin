import React from "react";
import {
  Flex,
  Avatar,
  TextInput,
  Textarea,
  MultiSelect,
  Button,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const CreatePost = () => {
  const form = useForm({
    initialValues: {
      project: "",
      description: "",
      categories: [],
      url: "",
    },
    validate: {
      project: (value) => (value ? null : "Project name is required"),
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

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex justify="flex-start" gap="30px">
        <Avatar color="cyan" radius="100%" size="lg">
          JD
        </Avatar>
        <Stack gap="xs" className="w-full">
          <TextInput
            placeholder="Project name"
            {...form.getInputProps("project")}
          />
          <Textarea
            placeholder="Project Description"
            {...form.getInputProps("description")}
          />
          <MultiSelect
            placeholder="Pick Categories"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("categories")}
          />
          <TextInput placeholder="Project URL" {...form.getInputProps("url")} />
          <Flex justify="flex-end" mt="md">
            <Button
              type="submit"
              radius="xl"
              color="teal"
              style={{ borderRadius: "50px", width: "150px" }}
            >
              Send
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </form>
  );
};

export default CreatePost;
