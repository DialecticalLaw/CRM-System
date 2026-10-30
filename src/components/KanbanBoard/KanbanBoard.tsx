import { type Task, type TaskListResponse } from "../../api/apiTypes";
import styles from "./KanbanBoard.module.scss";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";
import { TASK_STATUSES } from "../../api/constants";

export function KanbanBoard({
  tasks,
  setTasks,
  setTaskToDelete,
  setTaskDetails,
}: {
  tasks: TaskListResponse | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
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
            setTaskToDelete={setTaskToDelete}
            setTasks={setTasks}
            filteredTasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}
