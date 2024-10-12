import "./App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "./Layout";
import { Notifications, notifications } from "@mantine/notifications";
import NotificationPage from "./pages/NotificationPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import NotificationMessage from "./components/notifications/NotificationMessage";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.connect();

    socket.on("notifications", (notification) => {
      notifications.show({
        title: "You got a new notification",
        message: <NotificationMessage notification={notification} />,
        color: "#2ac808",
        onClick: () => navigate("/notifications"),
      });
    });

    return () => {
      socket.off("notifications");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <MantineProvider>
        <Notifications />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Routes>
        </Layout>
      </MantineProvider>
    </div>
  );
}

export default App;
