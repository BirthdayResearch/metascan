import React from "react";

interface DefaultTokenProps {
  size?: number;
  symbol?: string;
}

export default function DefaultToken({
  size,
  symbol,
}: DefaultTokenProps): JSX.Element {
  // const TextElement = Text as any;

  const bg = "white";
  const text = "black";
  const first = symbol?.substring(0, 1)?.toUpperCase() ?? "T";

  return (
    <svg height={size} viewBox="0 0 32 32" width={size}>
      <circle cx={16} cy={16} fill={bg} r={16} />

      <text
        alignmentBaseline="central"
        fill={text}
        fontSize="24"
        fontWeight="bolder"
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        {first}
      </text>
    </svg>
  );
}
