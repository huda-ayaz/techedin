import "./App.css";
// import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <MantineProvider>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </MantineProvider>
    </div>
  );
}

export default App;
