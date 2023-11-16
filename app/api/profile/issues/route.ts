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
