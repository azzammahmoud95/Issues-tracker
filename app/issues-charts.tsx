"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar,Cell } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueChart({ open, inProgress, closed }: Props) {
  const data = [
    { label: "Open", value: open, color: "#53A375" },
    { label: "In Progress", value: inProgress, color: "#B790C6" },
    { label: "Closed", value: closed, color: "#C83A4C" },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={50}
            fill="#8884d8" // Default color for bars
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>{" "}
    </Card>
  );
}

export default IssueChart;
