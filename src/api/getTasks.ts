import type { TaskListResponse } from "../types";
import { tasksBaseUrl } from "./constants";

export async function getTasks(): Promise<TaskListResponse | undefined> {
  try {
    const response = await fetch(
      `${tasksBaseUrl}?limit=100&orderBy=createdAt&orderDir=desc`,
      {
        method: "GET",
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
