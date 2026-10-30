import { Button } from "../ui/Button/Button";
import styles from "./DeleteTaskModal.module.scss";
import { deleteTask } from "../../api/deleteTask";
import { getTasks } from "../../api/getTasks";
import type { Task, TaskListResponse } from "../../api/apiTypes";

export function DeleteTaskModal({
  taskIdToDelete,
  setTaskIdToDelete,
  setTasks,
  setTaskDetails,
}: {
  taskIdToDelete: number | null;
  setTaskIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
}) {
  const handleDelete = async () => {
    if (taskIdToDelete) await deleteTask(taskIdToDelete);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTaskIdToDelete(null);
        }
      }}
      className={`${styles.blackout} ${taskIdToDelete ? styles.active : ""}`}
    >
      <div className={styles.modal}>
        <h2 className={styles.title}>
          Удалить задачу <span className={styles.id}>CRM-{taskIdToDelete}</span>
          ?
        </h2>
        <p>Это действие нельзя отменить</p>
        <div className={styles.buttonsWrapper}>
          <Button
            classNames={[styles.cancelBtn]}
            onClick={() => {
              setTaskIdToDelete(null);
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={async () => {
              await handleDelete();
              const updatedList = await getTasks();
              setTasks(updatedList);
              setTaskIdToDelete(null);
              setTaskDetails(null);
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
