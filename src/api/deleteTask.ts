import { tasksBaseUrl } from "./constants";

export async function deleteTask(id: number) {
  try {
    await fetch(`${tasksBaseUrl}${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
