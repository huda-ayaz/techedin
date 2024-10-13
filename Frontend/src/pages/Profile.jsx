import React, { useEffect } from "react";
import { UserInfo, ProjectStats } from "../components/profile";
import { Divider, Title } from "@mantine/core";
import CreatePost from "../components/CreatePost";
import ProjectCard from "../components/ProjectCard";

export default function Profile() {
  return (
    <div>
      <UserInfo isOwnProfile={true} />
      {/* <ProjectStats />  USE ONLY FOR DEMO*/}
      <div className="">
        <Title className="text-[#b8b8b8]" p="xs">
          My Projects
        </Title>
        <CreatePost />
        <ProjectCard />
      </div>
    </div>
  );
}
