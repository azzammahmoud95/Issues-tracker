import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/validation-schemas";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params);
    const body = await request.json();
    console.log("body", body);
    const { status } = await body;
    console.log("status", status);
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }

    const updated = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        status: status,
      },
    });

    // Return a proper JSON response
    return new Response(JSON.stringify({ status: 200, message: updated }));
  } catch (error) {
    console.error("Error:", error);

    // Return a proper JSON error response
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}
