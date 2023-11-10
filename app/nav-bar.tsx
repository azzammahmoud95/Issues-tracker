"use client";

import { signOut } from "next-auth/react";
import Skeleton  from "@/app/components/Skeleton";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
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
          <AuthStatus />
          {/* <p>s</p> */}
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


const AuthStatus = () => {
  const { status, data: session } = useSession();
console.log("sesssion",session?.user?.email)
  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated" || typeof session === "undefined")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{`${session!.user!.email}`}</Text>
          </DropdownMenu.Label>
          {/* <DropdownMenu.Item> */}
            <Button className="w-full" onClick={() =>signOut()}>Log out</Button>
          {/* </DropdownMenu.Item> */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;
