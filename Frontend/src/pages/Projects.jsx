import React from "react";
import { Title, Text, Alert } from "@mantine/core";
import ProjectCard from "../components/ProjectCard";
import { useProject } from "../ProjectContext";
import { useUser } from "../UserContext";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Projects() {
  const { projects } = useProject();
  const { user } = useUser();

  const interestedProjects = projects?.filter((p) => {
    return (
      Array.isArray(p.interested_users) &&
      p.interested_users.some(
        (interestedUser) => interestedUser === user?.user.id
      )
    );
  });

  return (
    <div className="p-6">
      <Title className="text-[#b8b8b8]">My Project Subscriptions</Title>
      {interestedProjects?.length > 0 ? (
        interestedProjects.map((p) => {
          return <ProjectCard key={p.id} project={p} interestedBool={true} />;
        })
      ) : (
        <Alert
          icon={<IconInfoCircle size={36} />}
          title="No Projects Found"
          color="green"
          variant="outline"
          mt="md"
          bg="#fff"
        >
          <Text>
            You have not subscribed to any projects yet. Explore and find
            projects of interest!
          </Text>
        </Alert>
      )}
    </div>
  );
}
