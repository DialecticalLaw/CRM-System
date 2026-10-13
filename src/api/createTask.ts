import type { TaskRequest } from "./model";

export async function createTask(body: TaskRequest) {
  try {
    await fetch("https://tech-mindset.ru/api/v1/tasks/", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
}
