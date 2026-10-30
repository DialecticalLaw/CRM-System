import type { TaskRequest } from "../types";
import { tasksBaseUrl } from "./constants";

export async function editTask(body: TaskRequest, id: number) {
  try {
    await fetch(`${tasksBaseUrl}${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
