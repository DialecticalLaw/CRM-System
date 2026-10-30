import { tasksBaseUrl } from "./constants";

export async function deleteTask(id: number): Promise<void> {
  try {
    await fetch(`${tasksBaseUrl}${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
