"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5  py-3 ">
      {/* <Container> */}
        <Flex justify="between" >
          <Flex align="center" gap="3">
            <Link href={`/`} className="text-purple text-4xl text-pink-600">
              <AiFillBug />{" "}
            </Link>
            <NavLinks />
          </Flex>
          {/* <AuthStatus /> */}
          <Box>s</Box>
          {/* //TODO: just to test */}
        </Flex>
      {/* </Container> */}
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links: { label: string; link: string }[] = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];

  return (
    <ul className="flex  space-x-6">
      {links.map((link) => (
        <Link
          key={link.link}
          className={classnames({
            "text-pink-600": link.link === currentPath,
            "text-zinc-500": link.link !== currentPath,
            "hover:text-pink-600 transition-colors font-medium": true,
          })}
          href={link.link}
        >
          {link.label}
        </Link>
      ))}
    </ul>
  );
};
export default NavBar;
