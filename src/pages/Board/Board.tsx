import { useEffect, useState } from "react";
import { TaskModal } from "../../components/TaskModal/TaskModal";
import { KanbanBoard } from "../../components/KanbanBoard/KanbanBoard";
import { Button } from "../../components/ui/Button/Button";
import styles from "./Board.module.scss";
import { getTasks } from "../../api/getTasks";
import { DeleteTaskModal } from "../../components/DeleteTaskModal/DeleteTaskModal";
import { TaskDetails } from "../../components/TaskDetails/TaskDetails";
import type { SubmitData, Task, TaskListResponse } from "../../types";

export function Board() {
  const [isTaskModalActive, setIsTaskModalActive] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskListResponse | null>(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
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
        <Button onClick={() => setIsTaskModalActive(true)}>+ Создать</Button>
      </div>

      <div className={styles.hr} />
      <div className={styles.kanbanWrapper}>
        <KanbanBoard
          setTaskDetails={setTaskDetails}
          setTasks={setTasks}
          setTaskIdToDelete={setTaskIdToDelete}
          tasks={tasks}
        />
        <TaskDetails
          setIsTaskModalActive={setIsTaskModalActive}
          setTaskToEdit={setTaskToEdit}
          details={taskDetails}
          setTaskDetails={setTaskDetails}
          setTaskIdToDelete={setTaskIdToDelete}
        />
      </div>

      <TaskModal
        key={taskToEdit ? `edit-${taskToEdit.id}` : "create"}
        taskData={taskToEdit}
        setTaskToEdit={setTaskToEdit}
        setTasks={setTasks}
        setTaskDetails={setTaskDetails}
        isTaskModalActive={isTaskModalActive}
        setIsTaskModalActive={setIsTaskModalActive}
      />
      <DeleteTaskModal
        setTasks={setTasks}
        setTaskIdToDelete={setTaskIdToDelete}
        setTaskDetails={setTaskDetails}
        taskIdToDelete={taskIdToDelete}
      />
    </div>
  );
}
