import { useEffect, useState } from "react";
import {
  TaskModal,
  type SubmitData,
} from "../../components/TaskModal/TaskModal";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";
import type { Task, TaskListResponse } from "../../api/model";
import { getTasks } from "../../api/getTasks";
import { DeleteTaskModal } from "../../components/DeleteTaskModal/DeleteTaskModal";
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";

export function Board() {
  const [isTaskModalActive, setTaskModalActive] = useState(false);
  const [tasks, setTasks] = useState<TaskListResponse | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<
    (SubmitData & { id: number }) | null
  >(null);
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
        <Button onClick={() => setTaskModalActive(true)}>+ Создать</Button>
      </div>

      <div className={styles.hr} />
      <div className={styles.kanbanWrapper}>
        <KanbanBoard
          setTaskDetails={setTaskDetails}
          setTasks={setTasks}
          setTaskToDelete={setTaskToDelete}
          tasks={tasks}
        />
        <TaskDetails
          setTaskModalActive={setTaskModalActive}
          setTaskToEdit={setTaskToEdit}
          details={taskDetails}
          setTaskDetails={setTaskDetails}
          setTaskToDelete={setTaskToDelete}
        />
      </div>

      <TaskModal
        key={taskToEdit ? `edit-${taskToEdit.id}` : "create"}
        taskData={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        setTasks={setTasks}
        setTaskDetails={setTaskDetails}
        isTaskModalActive={isTaskModalActive}
        setTaskModalActive={setTaskModalActive}
      />
      <DeleteTaskModal
        setTasks={setTasks}
        setTaskToDelete={setTaskToDelete}
        setTaskDetails={setTaskDetails}
        taskToDelete={taskToDelete}
      />
    </div>
  );
}
