import { LineChart, Line, ResponsiveContainer } from "recharts";
/**
 * TODO: Add gradient colour to the line chart
 */
// const uptrendColors = ["#42F9C2", "#082FD4"];
// const downtrendColors = ["#BE0000", "#FF12AF", "#B117B3", "#0821BB", "#42F9C2"];

export interface LineData {
  value: number;
}

export default function TrendLineChart({ data }: { data: LineData[] }) {
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const isUptrendDirection = lastValue >= firstValue;
  const strokeColor = isUptrendDirection ? "#42f9c2" : "#BE0000"; // TODO: Get color from tailwind config
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
