import { useEffect, useState } from "react";
import { CreateTaskModal } from "../../components/CreateTaskModal/CreateTaskModal";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";
import type { Task, TaskListResponse } from "../../api/model";
import { getTasks } from "../../api/getTasks";
import { DeleteTaskModal } from "../../components/DeleteTaskModal/DeleteTaskModal";
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";

export function Board() {
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<TaskListResponse | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

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
      <div className={styles.kanbanWrapper}>
        <KanbanBoard
          setTaskDetails={setTaskDetails}
          setTasks={setTasks}
          setTaskToDelete={setTaskToDelete}
          tasks={tasks}
        />
        <TaskDetails details={taskDetails} setTaskDetails={setTaskDetails} />
      </div>

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
