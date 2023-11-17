import { NextRequest, NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Issue } from "@prisma/client";
import prisma from "@/prisma/client";
// Create a server-side function
export async function GET() {
  // Get the session using the getSession function
  const session = await getServerSession(options);
  // If there is no session, return an unauthorized response
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const allIssues = await prisma.issue.findMany({
    where: {
      assignedToUserId: session.user.userid,
      status: {
        in: ["OPEN", "IN_PROGRESS", "CLOSED"],
      },
    },
  });

  
  const issuesByStatus: {
    OPEN: Issue[];
    IN_PROGRESS: Issue[];
    CLOSED: Issue[];
  } = {
    OPEN: [],
    IN_PROGRESS: [],
    CLOSED: [],
  };
  // ==> Filtering status and push them inside the object depending on status
  allIssues.forEach((issue) => {
    issuesByStatus[issue.status].push(issue);
  });

  return new NextResponse(
    JSON.stringify({ status: 200, message: issuesByStatus })
  );
}