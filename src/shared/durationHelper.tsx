import { padStart } from "lodash";

function secondsToDhm(s: number): {
  d: number;
  h: number;
  m: number;
  s: number;
} {
  return {
    d: Math.floor(s / (3600 * 24)),
    h: Math.floor((s % (3600 * 24)) / 3600),
    m: Math.floor(((s % (3600 * 24)) % 3600) / 60),
    s: s % 60,
  };
}

export function secondsToDhmsDisplay(seconds: number): string {
  const { d, h, m, s } = secondsToDhm(seconds);
  const dDisplay = d > 0 ? `${d}d` : "";
  const hDisplay =
    h > 0 ? ` ${d > 0 ? padStart(h.toString(), 2, "0") : h}h` : "";
  const mDisplay =
    m > 0 ? ` ${h > 0 ? padStart(m.toString(), 2, "0") : m}m` : "";
  const sDisplay = s > 0 ? ` ${padStart(s.toString(), 2, "0")}s` : "";
  return `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`;
}
