import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconHome,
  IconBellRinging,
  IconLayoutKanban,
  IconUserCircle,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../css/NavbarSimple.module.css";

const data = [
  { link: "/", label: "Home", icon: IconHome },
  { link: "/projects", label: "Projects", icon: IconLayoutKanban },
  { link: "/notifications", label: "Notifications", icon: IconBellRinging },
  { link: "/profile", label: "Profile", icon: IconUserCircle },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* <MantineLogo size={28} /> */}
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>
    </nav>
  );
}
