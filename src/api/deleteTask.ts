import { tasksBaseUrl } from "./constants";

export async function deleteTask(id: number): Promise<void | Error> {
  try {
    await fetch(`${tasksBaseUrl}${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return error as Error;
  }
}
