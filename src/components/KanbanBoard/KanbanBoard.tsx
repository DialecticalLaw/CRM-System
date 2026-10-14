import { TASK_STATUSES, type TaskListResponse } from "../../api/model";
import styles from "./KanbanBoard.module.scss";
import { KanbanColumn } from "../KanbanColumn/KanbanColumn";

export function KanbanBoard({
  tasks,
  setTasks,
  setTaskToDelete,
}: {
  tasks: TaskListResponse | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
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
            setTaskToDelete={setTaskToDelete}
            setTasks={setTasks}
            filteredTasks={filteredTasks}
          />
        );
      })}
    </div>
  );
}
