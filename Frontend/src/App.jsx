import "./App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./Layout";
import { Notifications } from '@mantine/notifications';
import "@mantine/notifications/styles.css";

function App() {
  return (
    <div>
      <MantineProvider>
        <Notifications />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </MantineProvider>
    </div>
  );
}

export default App;
