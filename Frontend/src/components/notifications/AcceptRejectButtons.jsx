import React, { useState } from "react";
import { IconCheck, IconXboxX } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const AcceptRejectButtons = () => {
  const [rejected, setRejected] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const handleReject = async () => {
    setRejected(true);
  };

  const handleAccept = async () => {
    setAccepted(true);
  };

  return (
    <div className="w-full flex">
      <Button
        leftSection={<IconCheck size={14} />}
        variant="light"
        onClick={handleAccept}
        color="teal"
        style={{ flex: 1, marginRight: "5px" }}
        display={rejected ? "none" : ""}
        disabled={accepted}
      >
        {!accepted ? "Accept" : "Accepted"}
      </Button>

      <Button
        variant="light"
        color="red"
        leftSection={<IconXboxX size={14} />}
        onClick={handleReject}
        style={{ flex: 1 }}
        display={accepted ? "none" : ""}
        disabled={rejected}
      >
        {!rejected ? "Reject" : "Rejected"}
      </Button>
    </div>
  );
};

export default AcceptRejectButtons;
