import React from "react";
import ProjectCard from "../components/ProjectCard";
import CreatePost from "../components/CreatePost";
import { Title } from "@mantine/core";
import { useProject } from "../ProjectContext";

export default function Home() {
  const { projects } = useProject();
  return (
    <div>
      <div className="m-6">
        <CreatePost />
      </div>
      <div className="p-6">
        <Title className="text-[#b8b8b8]">Recommended Projects</Title>
        {/* for every recommended project for this user, display a project card using its project ID */}
        {projects?.map((p) => {
          return <ProjectCard key={p.id} project={p} />;
        })}
      </div>
    </div>
  );
}
