// logic/trafficLogic.ts

export type Signal = "RED" | "YELLOW" | "GREEN";

export const SIGNAL_DURATION = {
  RED: 10,
  GREEN: 10,
  YELLOW: 3,
};

export function getNextSignal(current: Signal): Signal {
  if (current === "RED") return "GREEN";
  if (current === "GREEN") return "YELLOW";
  return "RED";
}
