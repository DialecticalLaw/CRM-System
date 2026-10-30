import type { TaskRequest } from "./apiTypes";

export async function editTask(body: TaskRequest, id: number) {
  try {
    await fetch(`https://tech-mindset.ru/api/v1/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
