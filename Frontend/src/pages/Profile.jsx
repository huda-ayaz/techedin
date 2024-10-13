import React, { useEffect, useState } from "react";
import { UserInfo, ProjectStats } from "../components/profile";
import { Divider, Title } from "@mantine/core";
import CreatePost from "../components/CreatePost";
import ProjectCard from "../components/ProjectCard";
import { useUser } from "../UserContext";

export default function Profile() {
  const { user } = useUser();

  return (
    <div>
      <UserInfo isOwnProfile={true} />
      {/* <ProjectStats /> */}
      <div className="">
        <Title className="text-[#b8b8b8]" p="xs">
          My Projects
        </Title>
        <CreatePost />
        {user?.owned_projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
