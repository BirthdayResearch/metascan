import { LineChart, Line, ResponsiveContainer } from "recharts";

export interface LineData {
  value: number;
}

export default function TrendLineChart({ data }: { data: LineData[] }) {
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const isUptrendDirection = lastValue >= firstValue;
  const strokeColor = isUptrendDirection ? "up-gradient" : "down-gradient";
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <defs>
          {/* TODO: Get color from tailwind config */}
          <linearGradient id="up-gradient">
            <stop offset="0%" stopColor="#42F9C2" />
            <stop offset="100%" stopColor="#082FD4" />
          </linearGradient>
          <linearGradient id="down-gradient">
            <stop offset="10%" stopColor="#BE0000" />
            <stop offset="85%" stopColor="#FF12AF" />
            <stop offset="100%" stopColor="#B117B3" />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="value"
          stroke={`url(#${strokeColor})`}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
