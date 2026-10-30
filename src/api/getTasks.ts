import type { TaskListResponse } from "../types";

export async function getTasks(): Promise<TaskListResponse> {
  const response = await fetch(
    "https://tech-mindset.ru/api/v1/tasks/?limit=100&orderBy=createdAt&orderDir=desc",
    {
      method: "GET",
    },
  );
  return await response.json();
}
