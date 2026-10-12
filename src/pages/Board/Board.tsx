import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";

export function Board() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>Доска CRM</h2>
        <Button onClick={() => {}}>+ Создать</Button>
      </div>

      <div className={styles.hr} />
      <KanbanBoard />
    </div>
  );
}
