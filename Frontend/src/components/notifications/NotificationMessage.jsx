import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NotificationMessage = ({ notification, sender }) => {
  const { project_id, type } = notification;
  const [projectDetails, setProjectDetails] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `https://techedin-production.up.railway.app/project?id=${project_id}`
        );
        if (response.data) {
          setProjectDetails(response.data);
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        setFetchError(true);
      }
    };

    if (project_id) {
      fetchProjectDetails();
    } else {
      setFetchError(true);
    }
  }, [project_id]);

  if (!projectDetails && !fetchError) {
    return <div>Loading...</div>;
  }

  const projectTitle = projectDetails?.project_title || project_id;
  const projectLink = project_id ? `/project/${project_id}` : "#";

  switch (type.toLowerCase()) {
    case "interested":
      return (
        <div>
          <Link to={`/user/${sender?.id || "#"}`}>
            {sender?.first_name || "User"}
          </Link>{" "}
          is interested in <Link to={projectLink}>Project: {projectTitle}</Link>
        </div>
      );

    case "accepted":
      return (
        <div>
          Congrats! You are officially a team member of{" "}
          <Link to={`/user/${projectDetails?.ownerId || "#"}`}>
            {projectDetails?.owner_name || sender.first_name}
          </Link>
          {"'s "}
          <Link to={projectLink}>Project: {projectTitle}</Link>
        </div>
      );

    case "rejected":
      return (
        <div>
          Unfortunately, your request for{" "}
          <Link to={projectLink}>Project: {projectTitle}</Link> has been
          rejected.
        </div>
      );

    default:
      return null;
  }
};

export default NotificationMessage;
