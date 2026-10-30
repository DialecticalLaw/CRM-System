import type { TaskHistoryResponse } from "../types";

export async function getHistory(
  id: number,
): Promise<TaskHistoryResponse | undefined> {
  try {
    const response = await fetch(
      `https://tech-mindset.ru/api/v1/tasks/${id}/history`,
      {
        method: "GET",
      },
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
