import type { Task } from "../../api/model";
import { Button } from "../ui/Button/Button";
import styles from "./TaskCard.module.scss";

export function TaskCard({
  data,
  setTaskToDelete,
}: {
  data: Task;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className={styles.card}>
      <p className={styles.id}>CRM-{data.id}</p>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.desc}>{data.description || "Без описания"}</p>

      <div className={styles.buttonsWrapper}>
        <Button classNames={[styles.openBtn]} onClick={() => {}}>
          Открыть
        </Button>
        <Button
          classNames={[styles.deleteBtn]}
          onClick={() => setTaskToDelete(data.id)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
