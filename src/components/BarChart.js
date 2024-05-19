import React from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const CustomLabel = (props) => {
  const { x, y, value, isPercent } = props;
  return (
    <text x={x} y={y} dy={-4} fontSize="10" fontFamily="sans-serif">
      {value}
      {isPercent == "No" ? null : "%"}
    </text>
  );
};

export default function BarChart1({ kpiData, isPercent }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={kpiData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="quarter" style={{ fontSize: 12 }} />
        <Bar
          name="Planned"
          dataKey="planned"
          label={<CustomLabel isPercent={isPercent} />}
          fill="#4FC4F7"
          barSize={25}
        />
        <Bar
          name="Actual"
          dataKey="actual"
          fill="#FC7500"
          label={<CustomLabel isPercent={isPercent} />}
          barSize={25}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
