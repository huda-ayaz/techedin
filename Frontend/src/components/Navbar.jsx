import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/techedin-full-logo.png";
import { Button } from '@mantine/core';

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
      <span className="font-bold">{item.label}</span>
    </Link>
  ));

  return (
    <nav className="bg-[#1e2734] ml-4">
      <div className={classes.navbarMain}>
        <Group justify="space-between">
          <img src={logo} alt="TechedIn logo" className="h-14 w-auto ml-2 mt-4 mb-6" />
        </Group>
        {links}
      </div>
      <div>
        <Button className={`${classes.logout} ml-4 mt-6 hover:cursor-not-allowed`} color="#121b28" radius='xl'>Log Out</Button>
      </div>
    </nav>
  );
}
