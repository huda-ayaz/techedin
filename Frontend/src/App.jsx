import "./App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "./Layout";
import { Notifications } from "@mantine/notifications";
import NotificationPage from "./pages/NotificationPage";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";

function App() {
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
