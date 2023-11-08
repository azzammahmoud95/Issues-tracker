import { NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
   console.log(params.id)
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
    console.log(issue);

    if (!issue) {
      return new Response(JSON.stringify({message:"Invalid Id"}),{status: 404});
    }
    return new Response(JSON.stringify(issue), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify(error), { status: 200 });
  }
  finally{
    prisma.$disconnect()
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
