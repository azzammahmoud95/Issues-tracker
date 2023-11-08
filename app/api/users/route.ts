import { NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const allUsers = await prisma.user.findMany();
  
      if (!allUsers)
        return new Response(JSON.stringify({ message: "No Users Found" }), {
          status: 404,
        });
        return new Response(JSON.stringify(allUsers), {
          status: 200,
        }); 
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify(error), { status: 200 });
    } finally {
      prisma.$disconnect();
    }
  }
  