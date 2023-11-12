
import React from "react";
import { Button,Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesStatusFilter from "./issues-status-filter";

export default function IssuesActions() {
  return (
    <Flex justify={`between`}>
        <IssuesStatusFilter />
      <Button>
        <Link href={`/issues/new`}>New Issue</Link>
      </Button>
    </Flex>
  );
}
