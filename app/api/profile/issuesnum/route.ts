import { NextRequest, NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
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

  // Retrieve counts for each status in a single query
  const issuesByStatus = await prisma.issue.groupBy({
    by: ["status"],
    _count: true,
    where: {
      assignedToUserId: session.user.userid,
      status: {
        in: ["OPEN", "IN_PROGRESS", "CLOSED"],
      },
    },
  });
console.log(issuesByStatus)
  // Create an object with all statuses and initialize counts to 0
  const result: Record<string, number> = {
    OPEN: 0,
    IN_PROGRESS: 0,
    CLOSED: 0,
  };

  // Update counts based on the results
  issuesByStatus.forEach((count) => {
    result[count.status as keyof typeof result] = count._count || 0;
  });


  // Return the counts as a response
  return new NextResponse(
    JSON.stringify({ status: 200, message: result })
  );
}
