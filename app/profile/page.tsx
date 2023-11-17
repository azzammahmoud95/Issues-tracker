"use client";

import { Box, Card,Grid,Flex, Avatar } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import IssueSummary from "../issue-summary";
import { useEffect, useState } from "react";
function ProfilePage() {
  const { data: session, status } = useSession();
  const [issues, setIssues] = useState({OPEN: 0,IN_PROGRESS:0,CLOSED:0});

  console.log("profile session", session);
  // if (status === "unauthenticated") redirect("/api/auth/signin");
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profile/issuesnum");
        if (response.ok) {
          const data = await response.json();
          setIssues(data.message);
          console.log("Updated issues:", data.message); 
        } else {
          console.error(
            "Failed to fetch issues:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchData();
  }, []);


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
              open={issues.OPEN || 0}
              inProgress={issues.IN_PROGRESS || 0}
              closed={issues.CLOSED || 0}
            />
            
      </div>
    </div>
  );
}

export default ProfilePage;
