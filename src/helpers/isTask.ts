import type { Task } from "../api/model";

export function isTask(value: unknown): value is Task {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "description" in value &&
    "executor" in value
  );
}
