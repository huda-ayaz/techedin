import React from "react";
import { UserInfo, ProjectStats } from "../components/profile";
import { Divider } from "@mantine/core";
import CreatePost from "../components/CreatePost";

export default function Profile() {
  return (
    <div className="bg-[#0A145E];">
      <UserInfo />
      <Divider className="my-5" />
      {/* <ProjectStats /> */}
      <CreatePost />
    </div>
  );
}
