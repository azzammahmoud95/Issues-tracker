import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from 'next/link'
import { AiOutlineArrowUp } from "react-icons/ai";
import IssueStatusBadge from "@/app/components/issue-status-bandage";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  
}
interface Props {
  searchParams?: IssueQuery;
  issue: Issue[];

}
async function IssuesTable({ searchParams, issue }: Props) {
  const session = await getServerSession(options);

  return (
    <Table.Root variant="surface" className="">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => 
      
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
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issue.map(issue => (
            <Table.Row key={issue.id}>
                <Table.Cell justify={'center'} >
                    
                        {issue.title}
                    
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
              {session?.user.role === "ADMIN" &&  <Table.Cell justify={'center'}  className="hidden md:table-cell"> 
              <Link href={`/issues/${issue.id}`} className="self-center bg-red-500 w-20 align-middle p-2 text-white block rounded-lg">Edit</Link>
              </Table.Cell>}
             
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
    label:"State",
    value:'status',
    className: `hidden md:table-cell `,
  }
];
export const columnsNames = columns.map(columns => columns.value)
export default IssuesTable;
