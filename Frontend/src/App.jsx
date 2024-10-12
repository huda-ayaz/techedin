import "./App.css";
// import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "./Layout";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import NotificationPage from "./pages/NotificationPage";

function App() {
  return (
    <div>
      <MantineProvider>
        <Notifications />
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Routes>
        </Layout>
      </MantineProvider>
    </div>
  );
}

export default App;
