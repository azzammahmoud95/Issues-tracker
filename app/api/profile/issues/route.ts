import { NextRequest, NextResponse } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
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

  // If there is a session, you can access the user information
  console.log("User ID:", session.user.userid);
  console.log("User Email:", session.user.email);
  console.log("User Name:", session.user.name);

  // Your logic for handling the authenticated user goes here

  // Return a response as needed
  return new NextResponse(JSON.stringify({ message: "Success" }));
}
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/client";
// import { getOptions} from "@/app/api/auth/[...nextauth]/route"
// import { options } from "../../auth/[...nextauth]/options";
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getOptions(options);
//     if (!session) {
//       return new Response(
//         JSON.stringify({ message: "Unauthorized" }),
//         { status: 401 }
//       );
//     }

//     const userIssueCounts = await prisma.issue.groupBy({
//       by: ["status"],
//       where: {
//         assignedToUserId: session.user.userid,
//       },
//       _count: {
//         status: true,
//       },
//     });

//     const formattedIssueCounts = userIssueCounts.reduce(
//       (acc, { status, _count }) => {
//         acc[status] = _count;
//         return acc;
//       },
//       {}
//     );

//     return new Response(JSON.stringify(formattedIssueCounts), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify(error), { status: 500 });
//   } finally {
//     prisma.$disconnect();
//   }
// }
