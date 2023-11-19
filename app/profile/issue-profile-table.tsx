"use client";

import { Issue, Status } from "@prisma/client";
import { Table, Select } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "@/app/components/issue-status-bandage";
import { useState } from "react";
import axios from "axios";
interface Props {
  issue: Issue[];
  updateData: boolean;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
}
const statuses: { label: string; value?: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
function IssueProfileTable({ issue, setUpdateData, updateData }: Props) {
  const [selectedIssue, setSelectedIssue] = useState<Issue>();

  const handleStatusChange = async (
    value: Status | undefined,
    issueId: number
  ) => {
    try {
      const response = await axios.put(`/api/status/${issueId}`, {
        status: value,
      });
      if (response) {
        console.log(response.data);
        setUpdateData(!updateData); // to fetch the data again when updating
      } else {
        console.error("Failed to update issue:", response);
      }
    } catch (error) {
      console.error("Error updating issue:", error);
    }
    // finally{
    //   setUpdateData(false)
    // }
  };
  return (
    <Table.Root variant="surface" className="">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              justify={"center"}
              key={column.label}
              className={column.className}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issue.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell justify={"center"}>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell justify={"center"} className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell justify={"center"} className="hidden md:table-cell">
              {issue.createdAt instanceof Date
                ? issue.createdAt.toDateString()
                : "N/A"}
            </Table.Cell>
            <Table.Cell justify={"center"} className="hidden md:table-cell ">
              <div className="w-full">
                <Select.Root
                  onValueChange={(value) => {
                    setSelectedIssue(selectedIssue);
                    handleStatusChange(value as Status, issue.id);
                  }}
                >
                  <Select.Trigger placeholder={issue.status} />
                  <Select.Content>
                    {statuses.map((status) => (
                      <Select.Item
                        key={status.label}
                        value={status.value || ""}
                      >
                        {status.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </div>{" "}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
  {
    label: "State",
    value: "status",
    className: "hidden md:table-cell",
  },
];
export const columnsNames = columns.map((columns) => columns.value);
export default IssueProfileTable;
