import type { Task, TaskRequest } from "../types";
import { tasksBaseUrl } from "./constants";

export async function createTask(body: TaskRequest): Promise<Task | Error> {
  try {
    const createdTask: Response = await fetch(tasksBaseUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return await createdTask.json();
  } catch (error) {
    return error as Error;
  }
}
