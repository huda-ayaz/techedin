import React, { useEffect, useState } from "react";
import {
  Text,
  Title,
  Notification,
  Avatar,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AcceptRejectButtons from "../components/notifications/AcceptRejectButtons";
import SendEmailButton from "../components/notifications/SendEmailButton";
import NotificationMessage from "../components/notifications/NotificationMessage";

const DummyUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "https://via.placeholder.com/40",
  },
];

const DummyNotifications = [
  {
    id: 0,
    recipientId: 1,
    senderId: 2,
    messageType: "interested",
    timeSpan: new Date(),
    projectId: 1,
  },
  {
    id: 1,
    recipientId: 1,
    senderId: 3,
    messageType: "accepted",
    timeSpan: new Date(),
    projectId: 2,
  },
  {
    id: 2,
    recipientId: 1,
    senderId: 2,
    messageType: "rejected",
    timeSpan: new Date(),
    projectId: 3,
  },
];

const NotificationPage = () => {
  const [notificationsList, setNotificationsList] = useState([
    ...DummyNotifications,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {};

    fetchNotifications();
  }, []);

  const renderNotifications = () => {
    return notificationsList.map((notification) => {
      const sender = DummyUsers.find(
        (user) => user.id === notification.senderId
      );

      return (
        <Notification
          key={notification.id}
          my="sm"
          withCloseButton={false}
          color="#2ac808"
        >
          <Group spacing="sm">
            <Avatar
              src={sender?.avatar}
              alt={sender?.name}
              onClick={() => navigate("/profiles")}
              style={{ cursor: "pointer" }}
              size="lg"
            />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                <NotificationMessage notification={notification} />
                <Text size="xs">{notification.timeSpan.toLocaleString()}</Text>
              </div>
            </div>
            <div className="w-full">
              {notification.messageType !== "rejected" && (
                <>
                  <Divider my="xs" />
                  <Group justify="flex-start" w="100%">
                    {notification.messageType === "interested" ? (
                      <AcceptRejectButtons />
                    ) : (
                      <SendEmailButton />
                    )}
                  </Group>
                </>
              )}
            </div>
          </Group>
        </Notification>
      );
    });
  };

  return (
    <div className="p-6">
      <Title className="text-[#b8b8b8]">Notifications</Title>
      {renderNotifications()}
    </div>
  );
};

export default NotificationPage;
