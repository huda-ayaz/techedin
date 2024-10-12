import React from "react";
import { IconCheck, IconXboxX } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const AcceptRejectButtons = () => {
  const handleReject = async () => {};

  const handleAccept = async () => {};

  return (
    <div className="w-full flex">
      <Button
        leftSection={<IconCheck size={14} />}
        variant="light"
        onClick={handleAccept}
        color="teal"
        style={{ flex: 1, marginRight: "5px" }}
      >
        Accept
      </Button>

      <Button
        variant="light"
        color="red"
        leftSection={<IconXboxX size={14} />}
        onClick={handleReject}
        style={{ flex: 1 }}
      >
        Reject
      </Button>
    </div>
  );
};

export default AcceptRejectButtons;
