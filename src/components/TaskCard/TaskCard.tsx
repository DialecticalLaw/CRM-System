import type { Task } from "../../api/model";
import { Button } from "../ui/Button/Button";
import styles from "./TaskCard.module.scss";

export function TaskCard({ data }: { data: Task }) {
  return (
    <div className={styles.card}>
      <p className={styles.id}>CRM-{data.id}</p>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.desc}>{data.description || "Без описания"}</p>

      <div className={styles.buttonsWrapper}>
        <Button classNames={[styles.openBtn]} onClick={() => {}}>
          Открыть
        </Button>
        <Button classNames={[styles.deleteBtn]} onClick={() => {}}>
          Удалить
        </Button>
      </div>
    </div>
  );
}
