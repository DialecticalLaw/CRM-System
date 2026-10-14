import { useEffect, useState } from "react";
import { CreateTaskModal } from "../../components/CreateTaskModal/CreateTaskModal";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";
import type { TaskListResponse } from "../../api/model";
import { getTasks } from "../../api/getTasks";
import { DeleteTaskModal } from "../../components/DeleteTaskModal/DeleteTaskModal";

export function Board() {
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<TaskListResponse | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <h2 className={styles.title}>Доска CRM</h2>
        <Button onClick={() => setIsActive(true)}>+ Создать</Button>
      </div>

      <div className={styles.hr} />
      <KanbanBoard setTaskToDelete={setTaskToDelete} tasks={tasks} />
      <CreateTaskModal
        setTasks={setTasks}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <DeleteTaskModal
        setTasks={setTasks}
        setTaskToDelete={setTaskToDelete}
        taskToDelete={taskToDelete}
      />
    </div>
  );
}
