import { NextRequest, NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
export async function GET() {
  const session = await getServerSession(options);
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const allIssuesProfile = await prisma.issue.findMany({
    where: {
      assignedToUserId: session.user.userid,
    },
  });
  
  // const issuesByStatus: {
  //   OPEN: Issue[];
  //   IN_PROGRESS: Issue[];
  //   CLOSED: Issue[];
  // } = {
  //   OPEN: [],
  //   IN_PROGRESS: [],
  //   CLOSED: [],
  // };
  // // ==> Filtering status and push them inside the object depending on status
  // allIssuesProfile.forEach((issue) => {
  //   issuesByStatus[issue.status].push(issue);
  // });

  return new Response(
    JSON.stringify({ status: 200, message: allIssuesProfile })
  );
}