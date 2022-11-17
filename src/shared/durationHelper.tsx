import { padStart } from "lodash";

function secondsToTime(s: number): {
  y: number;
  m: number;
  d: number;
  h: number;
  min: number;
  s: number;
} {
  // declaring all time denomination in seconds
  const minInSec = 60; // 60 sec per min
  const hInSec = minInSec * 60; //  3600 sec per hr
  const dInSec = hInSec * 24; // 86400 sec per day
  const mInSec = dInSec * 30.4167; // 2628002.88 sec per day, considering 30.4167 avg days in a month
  const yInSec = mInSec * 12; // 31536034.56 sec per year
  return {
    y: Math.floor(s / yInSec),
    m: Math.floor((s % yInSec) / mInSec),
    d: Math.floor((s % mInSec) / dInSec),
    h: Math.floor((s % dInSec) / hInSec),
    min: Math.floor((s % hInSec) / minInSec),
    s: s % 60,
  };
}

export function getDuration(seconds: number): string {
  const { y, m, d, h, min, s } = secondsToTime(seconds);
  const yDisplay = y > 0 ? `${y}y` : "";
  const mDisplay =
    m > 0 ? ` ${y > 0 ? padStart(m.toString(), 2, "0") : m}m` : "";
  const dDisplay =
    d > 0 ? ` ${m > 0 ? padStart(d.toString(), 2, "0") : d}d` : "";
  const hDisplay =
    h > 0 ? ` ${d > 0 ? padStart(h.toString(), 2, "0") : h}h` : "";
  const minDisplay =
    min > 0 ? ` ${h > 0 ? padStart(min.toString(), 2, "0") : min}min` : "";
  const sDisplay = s > 0 ? ` ${padStart(s.toString(), 2, "0")}s` : "";
  return `${yDisplay}${mDisplay}${dDisplay}${hDisplay}${minDisplay}${sDisplay}`;
}
