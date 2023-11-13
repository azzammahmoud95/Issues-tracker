import { Flex } from "@radix-ui/themes";
import IssuesActions from "./issues-actions";
import IssuesTable, { IssueQuery, columnsNames } from "./issues-table";
import { Metadata } from "next";
import { Status } from "@prisma/client";
import prisma from "@/prisma/client";
import Pagination from "@/app/components/pagination";
interface Props {
  searchParams: IssueQuery;
}
async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnsNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssuesActions />
      <IssuesTable searchParams={searchParams} issue={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
}
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
