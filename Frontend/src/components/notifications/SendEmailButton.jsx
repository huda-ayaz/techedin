import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";

const SendEmailButton = ({ projectId }) => {
  const [projectName, setProjectName] = useState("Awesome Project");
  const [projectOwnerEmail, setProjectOwnerEmail] =
    useState("owner@example.com");

  const fetchProjectDetails = async () => {};

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  const handleSendEmail = (e) => {
    e.preventDefault();

    const email = projectOwnerEmail;
    const subject = `Thrilled to Join the Project: ${projectName}!`;
    const body = encodeURIComponent(
      `Hi there!\n\nI am absolutely thrilled to have been accepted for the "${projectName}" project! 🎉\n\nI can't wait to connect with you and discuss how we can collaborate effectively. Please let me know when would be a great time for us to chat!\n\nLooking forward to your response!\n\nBest,\n[Your Name]`
    );

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  return (
    <Button
      leftSection={<IconMail size={14} />}
      variant="light"
      onClick={handleSendEmail}
      fullWidth
      color="#2ac808"
    >
      Start a Conversation
    </Button>
  );
};

export default SendEmailButton;
