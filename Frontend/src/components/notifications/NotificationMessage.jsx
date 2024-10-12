import React from "react";
import { Link } from "react-router-dom";

const DummyProjects = [
  { id: 1, name: "Project Alpha", ownerId: 1 },
  { id: 2, name: "Project Beta", ownerId: 2 },
  { id: 3, name: "Project Gamma", ownerId: 3 },
];

const DummyUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const getProjectDetails = (projectId) => {
  const project = DummyProjects.find((proj) => proj.id === projectId);
  if (project) {
    const owner = DummyUsers.find((user) => user.id === project.ownerId);
    return { projectName: project.name, owner };
  }
  return null;
};

const NotificationMessage = ({ notification }) => {
  const { senderId, recipientId, projectId, messageType } = notification;
  const sender = DummyUsers.find((user) => user.id === senderId);
  const recipient = DummyUsers.find((user) => user.id === recipientId);
  const projectDetails = getProjectDetails(projectId);

  if (!projectDetails) {
    return null;
  }

  switch (messageType) {
    case "interested":
      return (
        <div>
          <Link to={`/user/${senderId}`}>{sender.name}</Link> is interested in{" "}
          <Link to={`/project/${projectId}`}>{projectDetails.projectName}</Link>
        </div>
      );

    case "accepted":
      return (
        <div>
          Congrats! You are officially a team member of{" "}
          <Link to={`/user/${projectDetails.owner.id}`}>
            {projectDetails.owner.name}
          </Link>
          {"'s "}
          <Link to={`/project/${projectId}`}>{projectDetails.projectName}</Link>
        </div>
      );

    case "rejected":
      return (
        <div>
          Unfortunately, your request for{" "}
          <Link to={`/project/${projectId}`}>{projectDetails.projectName}</Link>{" "}
          has been rejected.
        </div>
      );

    default:
      return null;
  }
};

export default NotificationMessage;
