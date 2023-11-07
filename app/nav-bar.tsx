import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
export default function Navbar() {
    const links: { label: string; link: string }[]  = [
        {label:'Dashboard', link:'/'},
        {label:'Issues', link:'/issues'}
    ]

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={`/`}><AiFillBug /></Link>
      <ul className="flex  space-x-6">
        {links.map((link) =>  <Link key={link.link} className="text-zinc-500 hover:text-zinc-800 transition-colors" href={`/`}>{link.label}</Link>)} 
      </ul>
    </nav>
  );
}
