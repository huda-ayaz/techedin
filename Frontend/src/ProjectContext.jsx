import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProjectContext = createContext();

export const useProject = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState();

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(
        "https://techedin-production.up.railway.app/projects"
      );
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
