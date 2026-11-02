import styles from "./KanbanBoard.module.scss";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";
import { TASK_STATUSES } from "../../api/constants";
import type { Task, TaskListResponse } from "../../types";

export function KanbanBoard({
  tasks,
  setTasks,
  setTaskIdToDelete,
  setTaskDetails,
}: {
  tasks: TaskListResponse | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  setTaskIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
}) {
  return (
    <div className={styles.wrapper}>
      {TASK_STATUSES.map((statusData) => {
        const filteredTasks = tasks?.data.filter(
          (task) => task.status === statusData.value,
        );
        return (
          <KanbanColumn
            key={statusData.value}
            tasks={tasks}
            statusData={statusData}
            setTaskDetails={setTaskDetails}
            setTaskIdToDelete={setTaskIdToDelete}
            setTasks={setTasks}
            filteredTasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}
