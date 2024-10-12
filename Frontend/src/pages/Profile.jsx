import React from "react";
import { UserInfo, ProjectStats } from "../components/profile";
import { Divider } from "@mantine/core";
import CreatePost from "../components/CreatePost";
import ProjectCard from "../components/ProjectCard";

export default function Profile() {
  return (
    <div>
      <UserInfo isOwnProfile={true} />
      {/* <ProjectStats /> */}
      <CreatePost />
      <div className="p-6">
        <ProjectCard />
      </div>
    </div>
  );
}
