import { ChartDataI } from "@api/types";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";
import NumericFormat from "./commons/NumericFormat";

function CustomizedTickX(props) {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={8} fill="#666">
        <tspan
          textAnchor="middle"
          className="text-dark-700 text-xs -tracking-[0.12px]"
        >
          {dayjs(payload.value).format("MMM d")}
        </tspan>
      </text>
    </g>
  );
}

function CustomizedTickY(props) {
  const { x, y, payload } = props;
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={4} dx={12} fill="#666">
        <tspan
          textAnchor="middle"
          className="text-dark-700 text-xs -tracking-[0.12px]"
        >
          {formatter.format(payload.value)}
        </tspan>
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white-50 p-3 rounded-[10px]">
        <div className="text-xs text-light-700 -tracking-[0.12px]">
          {dayjs(label).format("MMM d, YYYY")}
        </div>
        {payload.map((pld) => (
          <div className="text-base text-light-1000 -tracking-[0.32px]">
            <span>Transactions:</span>
            <NumericFormat
              value={pld.value}
              thousandSeparator
              decimalScale={0}
              className="text-light-1000 font-semibold -tracking-[0.32px] ml-1"
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function TransactionsLineChart({
  data,
}: {
  data: ChartDataI[];
}) {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          tickMargin={8}
          axisLine={false}
          tick={<CustomizedTickX />}
        />
        <YAxis
          orientation="right"
          tickMargin={12}
          axisLine={false}
          tickCount={4}
          tick={<CustomizedTickY />}
        />
        <Tooltip content={CustomTooltip} cursor={{ strokeDasharray: 8 }} />
        <CartesianGrid stroke="#8C8C8C" strokeWidth={0.5} vertical={false} />
        <Line
          type="monotone"
          dataKey="tx_count"
          stroke="#0964F4"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
