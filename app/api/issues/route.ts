import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validation-schemas";
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate the request body
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  // Return the newly created issue
  return new Response(JSON.stringify(newIssue));
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const allIssues = await prisma.issue.findMany();

    if (!allIssues)
      return new Response(JSON.stringify({ message: "No Issues Found" }), {
        status: 404,
      });
      return new Response(JSON.stringify(allIssues), {
        status: 200,
      }); 
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 200 });
  } finally {
    prisma.$disconnect();
  }
}
