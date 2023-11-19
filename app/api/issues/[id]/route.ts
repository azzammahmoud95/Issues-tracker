import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema, patchIssueSchema } from "@/app/validation-schemas";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // console.log(params.id);
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
    // console.log(issue);

    if (!issue) {
      return new Response(JSON.stringify({ message: "Invalid Id" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(issue), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 200 });
  } finally {
    prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return new Response(JSON.stringify({ error: "Invalid issue" }), {
      status: 404,
    });

  const deleted = await prisma.issue.delete({
    where: { id: issue.id },
  });
  return new Response(JSON.stringify(deleted));
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //     const session = await getServerSession(authOptions);
    //   if (!session) return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    // Validate the request body
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }
    const { title, description, assignedToUserId,status } = body;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
      if (!user)
        return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!issue) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title:title,
        description:description,
        assignedToUserId: assignedToUserId,
        status:status
      },
    });
    // console.log(updatedIssue)
    return new Response(JSON.stringify(updatedIssue));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 200 });
  } finally {
    prisma.$disconnect();
  }
}
