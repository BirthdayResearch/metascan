import React from "react";

interface DETHprops {
  size?: number;
}

export default function dETH({ size }: DETHprops): JSX.Element {
  return (
    <svg height={size} width={size} viewBox="0 0 32 32">
      <circle cx={16} cy={16} fill="#E0E5FB" r={16} />

      <path
        d="M23.5 17.616l-7.502 10.379v-6.027l7.502-4.352zm-7.502-4.744v7.701L8.5 16.22l7.498-3.348zm0-8.872l7.497 12.22-7.497-3.35V4z"
        fill="#FFF"
      />

      <path
        d="M23.5 17.616l-7.502 10.379v-6.027l7.502-4.352zm-7.502-4.744v7.701L8.5 16.22l7.498-3.348zm0-8.872l7.497 12.22-7.497-3.35V4z"
        fill="#627EEA"
        fillOpacity={0.8}
      />

      <path
        d="M8.5 17.616l7.498 4.351v6.028L8.5 17.616zM15.998 4v8.87L8.5 16.22 15.998 4z"
        fill="#FFF"
      />

      <path
        d="M8.5 17.616l7.498 4.351v6.028L8.5 17.616zM15.998 4v8.87L8.5 16.22 15.998 4z"
        fill="#627EEA"
        fillOpacity={0.6}
      />

      <path d="M15.998 20.573l7.497-4.353-7.497-3.348z" fill="#627EEA" />
    </svg>
  );
}
