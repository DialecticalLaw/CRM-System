import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";

const TASK_STATUS_LABELS = {
  backlog: "Бэклог",
  todo: "К выполнению",
  inProgress: "В работе",
  review: "Ревью",
  readyForRelease: "Готово к релизу",
  onHold: "На паузе",
  done: "Выполнено",
} as const;

export type TaskStatus = keyof typeof TASK_STATUS_LABELS;

export function Board() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>Доска CRM</h2>
        <Button onClick={() => {}}>+ Создать</Button>
      </div>

      <div className={styles.hr} />

      <div className={styles.columns}>
        {Object.entries(TASK_STATUS_LABELS).map((status) => {
          return (
            <div key={status[0]} className={styles.column}>
              <p className={styles.columnTitle}>
                {status[1]} {"(0)"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
