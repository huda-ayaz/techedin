import React from "react";
import { Title } from "@mantine/core";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="p-6">
      <Title className="text-[#b8b8b8]">My Project Subscriptions</Title>
      <ProjectCard />
    </div>
  );
}
