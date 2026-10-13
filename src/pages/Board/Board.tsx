import { useState } from "react";
import { CreateTaskModal } from "../../components/CreateTaskModal/CreateTaskModal";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";

export function Board() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>Доска CRM</h2>
        <Button onClick={() => setIsActive(true)}>+ Создать</Button>
      </div>

      <div className={styles.hr} />
      <KanbanBoard />
      <CreateTaskModal isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
}
