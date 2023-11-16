'use client';

import { Box, Card } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

function ProfilePage() {
 const {data:session,status} =  useSession();

console.log("why null",session)
  console.log("profile", session);
  return (
    <Card >
      hi
    </Card>
  );
}

export default ProfilePage;
