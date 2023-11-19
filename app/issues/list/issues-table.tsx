import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from 'next/link'
import { AiOutlineArrowUp } from "react-icons/ai";
import IssueStatusBadge from "@/app/components/issue-status-bandage";
export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  
}
interface Props {
  searchParams?: IssueQuery;
  issue: Issue[];

}
function IssuesTable({ searchParams, issue }: Props) {

  return (
    <Table.Root variant="surface" className="">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell justify={'center'}  key={column.label} className={column.className}>
                <NextLink href={{
                    query: {
                        ...searchParams,
                        orderBy: column.value
                    }
                }}>{column.label}</NextLink>
                {column.value === searchParams?.orderBy && (
                    <AiOutlineArrowUp className="inline"/>
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issue.map(issue => (
            <Table.Row key={issue.id}>
                <Table.Cell justify={'center'} >
                    <Link href={`/issues/${issue.id}`}>
                        {issue.title}
                    </Link>
                    <div className="block md:hidden">
                        <IssueStatusBadge status={issue.status}/>
                    </div>
                </Table.Cell>
                <Table.Cell justify={'center'}  className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell justify={'center'} className="hidden md:table-cell">
              {issue.createdAt instanceof Date ? issue.createdAt.toDateString(): 'N/A'}
              </Table.Cell>
              {/* <Table.Cell justify={'center'}  className="hidden md:table-cell ">
                <IssuesStatusToggle issueProps={issue}/>
              </Table.Cell> */}
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
  // {
  //   label:"State",
  //   value:'status',
  //   className: "hidden md:table-cell",
  // }
];
export const columnsNames = columns.map(columns => columns.value)
export default IssuesTable;
