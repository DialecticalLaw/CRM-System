import { useState } from "react";
import type { Task } from "../../api/apiTypes";
import { Button } from "../ui/Button/Button";
import styles from "./TaskCard.module.scss";

export function TaskCard({
  data,
  setTaskIdToDelete,
  setTaskDetails,
}: {
  data: Task;
  setTaskIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("application/json", JSON.stringify(data));
    requestAnimationFrame(() => setIsDragging(true));
  };

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <p className={styles.id}>CRM-{data.id}</p>
      <p className={styles.title}>{data.title}</p>
      <p className={styles.desc}>{data.description || "Без описания"}</p>

      <div className={styles.buttonsWrapper}>
        <Button
          classNames={[styles.openBtn]}
          onClick={() => setTaskDetails(data)}
        >
          Открыть
        </Button>
        <Button
          classNames={[styles.deleteBtn]}
          onClick={() => setTaskIdToDelete(data.id)}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
