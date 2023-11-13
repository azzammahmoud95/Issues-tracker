"use client";

import { signOut } from "next-auth/react";
import Skeleton from "@/app/components/Skeleton";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href={`/`} className="text-purple text-4xl text-red-600">
            {/* <AiFillBug />{" "} */}
            <Image src={`/logo.png`} width={50} height={50} alt="logo" />
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
    { label: "Issues", link: "/issues/list" },
  ];

  return (
    <ul className="flex  space-x-6">
      {links.map((link) => (
        <Link
          key={link.link}
          className={classnames({
            "text-red-600": link.link === currentPath,
            "text-zinc-500": link.link !== currentPath,
            "hover:text-red-600 transition-colors font-medium": true,
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
  const router = useRouter()
  console.log("sesssion", session?.user?.email);
  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated" || typeof session === "undefined")
    return (
      <Link className="nav-link flex items-center" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box className="flex items-center">
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
        <DropdownMenu.Content className="p-1">
          <DropdownMenu.Label>
            <Text size="2">{`${session!.user!.email}`}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Label>
            <Button  onClick={() => router.push('/profile') } variant="outline" className="w-full ">
              Profile
            </Button>
            </DropdownMenu.Label>
            <DropdownMenu.Label>

          <Button className="w-full" onClick={() => signOut()}>
            Log out
          </Button>
          </DropdownMenu.Label>

        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default NavBar;
