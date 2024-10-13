import { Anchor, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import logo from "../assets/techedin-short-logo.png";
import classes from "../css/FooterCentered.module.css";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
      style={{
        color: "#2ac808", // Change link color
        cursor: "not-allowed", // Set cursor to not-allowed
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div
      className={`bg-[#1e2734] border-t border-gray-300 fixed bottom-0 left-0 right-0 ${classes.logo}`}
    >
      <div className={classes.inner}>
        <img
          src={logo}
          className="h-8" // Reduce height of logo
          alt="TechedIn logo"
        />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            style={{ cursor: "not-allowed" }}
          >
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            style={{ cursor: "not-allowed" }}
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            style={{ cursor: "not-allowed" }}
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
