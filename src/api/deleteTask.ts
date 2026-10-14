export async function deleteTask(id: number) {
  try {
    await fetch(`https://tech-mindset.ru/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
