import type { Task, TaskRequest } from "../types";
import { tasksBaseUrl } from "./constants";

export async function editTask(
  body: TaskRequest,
  id: number,
): Promise<Task | undefined> {
  try {
    const editedTask: Response = await fetch(`${tasksBaseUrl}${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return await editedTask.json();
  } catch (error) {
    console.error(error);
  }
}
