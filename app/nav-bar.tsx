"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

export default function Navbar() {
  const currentPath = usePathname();
  const links: { label: string; link: string }[] = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={`/`} className="text-purple text-4xl text-pink-600">
        <AiFillBug />{" "}
      </Link>
      <ul className="flex  space-x-6">
        {links.map((link) => (
          <Link
            key={link.link}
            className={classnames({
                'text-pink-600': link.link === currentPath,
                'text-zinc-500': link.link !== currentPath,
                'hover:text-pink-600 transition-colors font-medium': true
            })}
            href={link.link}
          >
            {/* ${
              link.link === currentPath ? "text-pink-600" : "text-zinc-500"
            } hover:text-pink-600 transition-colors font-medium */}
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
