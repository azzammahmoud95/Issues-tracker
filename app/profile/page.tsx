"use client";

import { Box, Card,Grid,Flex, Avatar } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import IssueSummary from "../issue-summary";
import prisma from "@/prisma/client";
function ProfilePage() {
  const { data: session, status } = useSession();
  console.log("profile session", session);
  if (status === "unauthenticated") redirect("/api/auth/signin");



  return (
    <div className="p-10 flex justify-between border rounded-lg">
      <Avatar
        src={session?.user.image || ""}
        fallback="?"
        size="9"
        radius="medium"
        title={session?.user.name || ""}
      />
      <div className="w-2/5 pl-3 flex flex-col justify-between ">
        <span className="text-lg">
          <strong>Firstname:</strong> {session?.user.firstname}
        </span>
        <p className="text-lg">
          <strong>Lastname:</strong> {session?.user.lastname}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {session?.user.email}
        </p>
        <p className="text-lg">
          <strong>Role: </strong>Role{" "}
        </p>
        <p className="text-lg">
          <strong>Total issues: </strong>9090{" "}
        </p>
      </div>
      <div className="w-2/5">
            <IssueSummary
              open={12}
              inProgress={5}
              closed={6}
            />
            
      </div>
    </div>
  );
}

export default ProfilePage;
