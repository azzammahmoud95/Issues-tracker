import React from "react";
import { Table, Card, Flex, Text, Avatar, } from "@radix-ui/themes";
import Skeleton from '@/app/components/Skeleton'
import { ResponsiveContainer,BarChart,XAxis,YAxis,Bar } from "recharts";
export default function Loading() {
  const issues = [1, 2, 3, 4, 5];
  const containers = [1, 2, 3];
  const data = [
    { label: 'Open', value: 2 },
    { label: 'In Progress', value: 1 },
    { label: 'Closed', value: 1 },
  ];
  return (
    <>
      <div className="p-10 flex justify-between border rounded-lg">
        <Skeleton width={"10rem"} height={"10rem"} className="rounded-md" />
        <div className="w-2/5 pl-3 flex flex-col justify-between">
          <span className="text-lg">
            <strong>Firstname:</strong> <Skeleton />
          </span>
          <p className="text-lg">
            <strong>Lastname:</strong> <Skeleton />
          </p>
          <p className="text-lg">
            <strong>Email:</strong> <Skeleton />
          </p>
          <p className="text-lg">
            <strong>Role: </strong>
            <Skeleton />
          </p>
          <p className="text-lg">
            <strong>Total issues: </strong>
            <Skeleton />
          </p>
        </div>
        <div className="w-2/5 flex items-center">
          <Flex gap={`4`} direction={"row"}>
            {containers.map((container) => (
              <Card key={container}>
                <Flex direction={`column`} gap={`1`}>
                <Skeleton width={'10rem'} height={`2rem`}/>
                  <Text  className="font-bold">
                    <Skeleton width={'10rem'} height={`3rem`}/>
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </div>
      </div>
      <Card>
      {/* <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer> */}
    </Card>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              State
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>{" "}
    </>
  );
}
