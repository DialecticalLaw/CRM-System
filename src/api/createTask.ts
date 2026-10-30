import type { TaskRequest } from "../types";
import { tasksBaseUrl } from "./constants";

export async function createTask(body: TaskRequest) {
  try {
    await fetch(tasksBaseUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
