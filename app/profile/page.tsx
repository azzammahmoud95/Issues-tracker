"use client";

import { Box, Card, Grid, Flex, Avatar } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import IssueChart from "../issues-charts";
import IssueSummary from "../issue-summary";
import { useEffect, useState } from "react";
import IssuesTable from "../issues/list/issues-table";
import IssueProfileTable from "./issue-profile-table";
function ProfilePage() {
  const { data: session, status } = useSession();
  const [issuesCount, setIssuesCount] = useState({
    OPEN: 0,
    IN_PROGRESS: 0,
    CLOSED: 0,
  });
  const [issuesData, setIssuesData] = useState([]);
  const [updateData,setUpdateData] = useState(false)
  // if (status === "unauthenticated") redirect("/api/auth/signin");

  const fetchData = async () => {
    try {
      const responseCount = await fetch("/api/profile/issuesnum");
      if (responseCount.ok) {

        const dataCount = await responseCount.json();
        setIssuesCount(dataCount.message);
        console.log("Updated issuesCount:", dataCount.message);
      } else {
        console.error(
          "Failed to fetch issuesCount:",
          responseCount.status,
          responseCount.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching issuesCount:", error);
    }
    try {
      const responseIssues = await fetch("/api/profile/issues");
      if (responseIssues.ok) {
        const issuesData = await responseIssues.json();
        setIssuesData(issuesData.message);
        console.log("Updated issuesData:", issuesData.message);
      } else {
        console.error(
          "Failed to fetch issuesData:",
          responseIssues.status,
          responseIssues.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [updateData]);
  return (
    <>
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
            <strong>Total issues: </strong>
            {/* Sum of total issues  */}
            {issuesData.length}
          </p>
        </div>
        <div className="w-2/5 flex items-center">
          <IssueSummary
            open={issuesCount.OPEN || 0}
            inProgress={issuesCount.IN_PROGRESS || 0}
            closed={issuesCount.CLOSED || 0}
          />
        </div>
      </div>
      <IssueChart
        open={issuesCount.OPEN || 0}
        inProgress={issuesCount.IN_PROGRESS || 0}
        closed={issuesCount.CLOSED || 0}
      />
      <IssueProfileTable issue={issuesData} updateData={updateData} setUpdateData={setUpdateData}/>
    </>
  );
}

export default ProfilePage;
