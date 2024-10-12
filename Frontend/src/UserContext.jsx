import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const dummyUser = {
    userUUID: "c7e5a4b1-3c7b-4f0c-b00e-b0a6391a60f4",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    college: "Brooklyn College",
    githubUsername: "alicejohnson123",
    inputtedInterests: [
      "Web Development",
      "Machine Learning",
      "Data Science",
      "UI/UX Design",
    ],
    analyzedKeywordsFromGithub: [],
    interestedProjects: [],
    acceptedProjects: [],
    rejectedProjects: [],
    timeCreated: new Date(),
  };

  const fetchUserData = async () => {
    // try {
    //   const response = await axios.get("/api");
    //   setUser(response.data);
    // } catch (error) {
    //   //   console.error("Error fetching user data", error);
    //   setUser(dummyUser);
    // }
  };

  useEffect(() => {
    setUser(dummyUser);
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
