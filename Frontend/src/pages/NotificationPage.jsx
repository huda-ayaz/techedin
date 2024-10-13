import React, { useEffect, useState } from "react";
import {
  Text,
  Title,
  Notification,
  Avatar,
  Group,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AcceptRejectButtons from "../components/notifications/AcceptRejectButtons";
import SendEmailButton from "../components/notifications/SendEmailButton";
import NotificationMessage from "../components/notifications/NotificationMessage";
import axios from "axios";
import { useUser } from "../UserContext";

const DummyUsers = [
  {
    id: 1,
    first_name: "Alice",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 2,
    first_name: "Bob",
    avatar: "https://via.placeholder.com/40",
  },
  {
    id: 3,
    first_name: "Charlie",
    avatar: "https://via.placeholder.com/40",
  },
];

const DummyNotifications = [
  // {
  //   notification_id: "dummy-0",
  //   recipient_id: "1",
  //   sender_id: "2",
  //   type: "Interested",
  //   time_stamp: new Date(),
  //   project_id: "Personal Portfolio",
  // },

  {
    notification_id: "dummy-1",
    recipient_id: "1",
    sender_id: "3",
    type: "Accepted",
    time_stamp: new Date(),
    project_id: "ThunderCPP",
  },

  {
    notification_id: "dummy-2",
    recipient_id: "1",
    sender_id: "2",
    type: "Rejected",
    time_stamp: new Date(),
    project_id: "Dev",
  },
];
const dummySenderAl = {
  id: 5,
  first_name: "Alejandro",
  avatar: "https://via.placeholder.com/40",
};
const dummySenderM = {
  id: 4,
  first_name: "Mahamud",
  avatar: "https://via.placeholder.com/40",
};

const dummyNotiicationAL = {
  notification_id: "dummy-1",
  recipient_id: "5",
  sender_id: "4",
  type: "Accepted",
  time_stamp: new Date(),
  project_id: "Chat Application",
};

const dummyNotiicationM = {
  notification_id: "dummy-0",
  recipient_id: "4",
  sender_id: "5",
  type: "Interested",
  time_stamp: new Date(),
  project_id: "Chat Application",
};

const NotificationPage = () => {
  const [notificationsList, setNotificationsList] = useState([]);
  const [senders, setSenders] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://techedin-production.up.railway.app/notifications?recipientId=${user.id}`
        );
        setNotificationsList(response.data);

        const senderIds = [
          ...new Set(
            response.data.map((notification) => notification.sender_id)
          ),
        ];
        const sendersResponse = await Promise.all(
          senderIds.map((senderId) =>
            axios.get(
              `https://techedin-production.up.railway.app/user/${senderId}`
            )
          )
        );

        const sendersMap = sendersResponse.reduce((acc, res) => {
          acc[res.data.id] = res.data;
          return acc;
        }, {});
        setSenders(sendersMap);
        console.log("Senders  ", sendersMap);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };

    fetchNotifications();
  }, []);

  const renderNotifications = () => {
    const allNotifications = [...notificationsList, ...DummyNotifications];

    return allNotifications.map((notification) => {
      const sender =
        senders[notification.sender_id] ||
        DummyUsers.find(
          (user) => user.id.toString() === notification.sender_id
        );

      return (
        <Notification
          key={notification.notification_id}
          my="sm"
          withCloseButton={false}
          color="#2ac808"
        >
          <Group spacing="sm">
            <Avatar
              alt={sender?.first_name}
              onClick={() => navigate("/profiles")}
              style={{ cursor: "pointer" }}
              size="lg"
              color="teal"
            >
              {sender?.first_name ? sender.first_name[0] : ""}
            </Avatar>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                <NotificationMessage
                  notification={notification}
                  sender={sender}
                />
                <Text size="xs">
                  {new Date(notification.time_stamp).toLocaleString()}
                </Text>
              </div>
            </div>
            <div className="w-full">
              {notification.type.toLowerCase() !== "rejected" && (
                <>
                  <Divider my="xs" />
                  <Group justify="flex-start" w="100%">
                    {notification.type.toLowerCase() === "interested" ? (
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
      <Notification
        key={dummyNotiicationM.notification_id}
        my="sm"
        withCloseButton={false}
        color="#2ac808"
      >
        <Group spacing="sm">
          <Avatar
            alt={dummySenderAl?.first_name}
            onClick={() => navigate("/profiles")}
            style={{ cursor: "pointer" }}
            size="lg"
            color="teal"
          >
            {dummySenderAl?.first_name ? dummySenderAl.first_name[0] : ""}
          </Avatar>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              <NotificationMessage
                notification={dummyNotiicationM}
                sender={dummySenderAl}
              />
              <Text size="xs">
                {new Date(dummyNotiicationM.time_stamp).toLocaleString()}
              </Text>
            </div>
          </div>
          <div className="w-full">
            {dummyNotiicationM.type.toLowerCase() !== "rejected" && (
              <>
                <Divider my="xs" />
                <Group justify="flex-start" w="100%">
                  {dummyNotiicationM.type.toLowerCase() === "interested" ? (
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
      {/* <Notification
        key={dummyNotiicationAL.notification_id}
        my="sm"
        withCloseButton={false}
        color="#2ac808"
      >
        <Group spacing="sm">
          <Avatar
            alt={dummySenderAl?.first_name}
            onClick={() => navigate("/profiles")}
            style={{ cursor: "pointer" }}
            size="lg"
            color="teal"
          >
            {dummySenderAl?.first_name ? dummySenderAl.first_name[0] : ""}
          </Avatar>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              <NotificationMessage
                notification={dummyNotiicationAL}
                sender={dummySenderM}
              />
              <Text size="xs">
                {new Date(dummyNotiicationAL.time_stamp).toLocaleString()}
              </Text>
            </div>
          </div>
          <div className="w-full">
            {dummyNotiicationAL.type.toLowerCase() !== "rejected" && (
              <>
                <Divider my="xs" />
                <Group justify="flex-start" w="100%">
                  {dummyNotiicationAL.type.toLowerCase() === "interested" ? (
                    <AcceptRejectButtons />
                  ) : (
                    <SendEmailButton />
                  )}
                </Group>
              </>
            )}
          </div>
        </Group>
      </Notification> */}
      {renderNotifications()}
    </div>
  );
};

export default NotificationPage;
