import React, { useEffect, useState } from "react";
import { Title, Container } from "@mantine/core";
import { Octokit } from "@octokit/core";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";

const ProjectStats = () => {
  const [languages, setLanguages] = useState({});
  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
  });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await octokit.request("GET /users/{username}/repos", {
          username: "AleHS01",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        let languageTotals = {};
        let overallTotal = 0;

        const languagePromises = repos.data.map(async (repo) => {
          const languageData = await axios.get(repo.languages_url);
          const languagesInRepo = languageData.data;

          for (const [language, bytes] of Object.entries(languagesInRepo)) {
            if (languageTotals[language]) {
              languageTotals[language] += bytes;
            } else {
              languageTotals[language] = bytes;
            }
            overallTotal += bytes;
          }
        });

        await Promise.all(languagePromises);

        const sortedLanguages = Object.entries(languageTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const languagePercentages = sortedLanguages.map(
          ([language, bytes]) => ({
            id: language,
            label: language,
            value: ((bytes / overallTotal) * 100).toFixed(2),
            color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
          })
        );

        setLanguages(languagePercentages);
      } catch (error) {
        console.error("Error fetching repositories or languages:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Container p={0}>
      <div
        className="w-full"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          height: 380,
          margin: "20px 0",
          padding: "5px 10px 20px",
        }}
      >
        <Title order={2} className="text-[#2ac808]">
          GitHub Project Stats
        </Title>
        <ResponsivePie
          data={languages}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Container>
  );
};

export default ProjectStats;
