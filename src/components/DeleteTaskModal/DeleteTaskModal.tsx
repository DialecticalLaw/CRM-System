import { Button } from "../ui/Button/Button";
import styles from "./DeleteTaskModal.module.scss";
import { deleteTask } from "../../api/deleteTask";
import { getTasks } from "../../api/getTasks";
import type { TaskListResponse } from "../../api/model";

export function DeleteTaskModal({
  taskToDelete,
  setTaskToDelete,
  setTasks,
}: {
  taskToDelete: number | null;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
}) {
  const handleDelete = async () => {
    if (taskToDelete) await deleteTask(taskToDelete);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTaskToDelete(null);
        }
      }}
      className={`${styles.blackout} ${taskToDelete ? styles.active : ""}`}
    >
      <div className={styles.modal}>
        <h2 className={styles.title}>
          Удалить задачу <span className={styles.id}>CRM-{taskToDelete}</span>?
        </h2>
        <p>Это действие нельзя отменить</p>
        <div className={styles.buttonsWrapper}>
          <Button
            classNames={[styles.cancelBtn]}
            onClick={() => {
              setTaskToDelete(null);
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={async () => {
              await handleDelete();
              const updatedList = await getTasks();
              setTasks(updatedList);
              setTaskToDelete(null);
            }}
            classNames={[styles.deleteBtn]}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
}
