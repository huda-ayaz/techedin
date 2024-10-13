import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Text,
  Title,
  Group,
  Badge,
  Divider,
  Loader,
} from "@mantine/core";

const RightSidebar = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  const fetchPopularRepositories = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc"
      );
      setRepositories(response.data.items.slice(0, 5));
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchPopularRepositories();
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <Title
        order={3}
        style={{ marginBottom: "16px", fontWeight: "bold", color: "#b8b8b8" }}
      >
        Trending Repositories
      </Title>
      {loading ? (
        <Text align="center">
          <Loader />
          <Text size="sm" color="dimmed" style={{ marginTop: "8px" }}>
            Loading...
          </Text>
        </Text>
      ) : (
        repositories.map((repo) => (
          <Card
            key={repo.id}
            shadow="sm"
            padding="lg"
            style={{ marginBottom: "16px", border: "1px solid #e0e0e0" }}
            radius="md"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#2ac808",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              <Text size="sm" weight={500} style={{ lineHeight: "1.4" }}>
                {repo.name}
              </Text>
            </a>
            <Text size="xs" color="dimmed" style={{ marginBottom: "8px" }}>
              {repo.description || "No description available."}
            </Text>
            <Group position="apart" style={{ marginTop: "auto" }}>
              <Badge color="gray" variant="light">
                ⭐ {repo.stargazers_count}
              </Badge>
              <Text size="xs" color="gray">
                {repo.language}
              </Text>
            </Group>
          </Card>
        ))
      )}
      <Divider style={{ marginTop: "16px" }} />
      <Text
        size="xs"
        color="dimmed"
        align="center"
        style={{ marginTop: "16px" }}
      >
        See more on GitHub
      </Text>
    </div>
  );
};

export default RightSidebar;
