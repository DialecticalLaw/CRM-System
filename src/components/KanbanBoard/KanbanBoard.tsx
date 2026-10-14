import {
  TASK_STATUSES,
  type TaskListResponse,
  type TaskStatus,
} from "../../api/model";
import styles from "./KanbanBoard.module.scss";
import { TaskCard } from "../TaskCard/TaskCard";
import { useState } from "react";
import { isTask } from "../../helpers/isTask";
import { editTask } from "../../api/editTask";
import { getTasks } from "../../api/getTasks";

export function KanbanBoard({
  tasks,
  setTasks,
  setTaskToDelete,
}: {
  tasks: TaskListResponse | null;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null);

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    nextStatus: TaskStatus,
  ) => {
    e.preventDefault();
    setOverColumn(null);
    const data: unknown = JSON.parse(
      e.dataTransfer.getData("application/json"),
    );
    if (!isTask(data) || data.status === nextStatus) return;

    await editTask(
      {
        executorId: 1,
        description: data.description,
        title: data.title,
        deadline: data.deadline || null,
        status: nextStatus,
      },
      data.id,
    );

    const updatedList = await getTasks();
    setTasks(updatedList);
  };

  return (
    <div className={styles.wrapper}>
      {TASK_STATUSES.map((statusData) => {
        const filteredTasks = tasks?.data.filter(
          (task) => task.status === statusData.value,
        );
        return (
          <div
            key={statusData.value}
            className={`${styles.column} ${overColumn === statusData.value ? styles.over : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setOverColumn(statusData.value)}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setOverColumn(null);
            }}
            onDrop={(e) => handleDrop(e, statusData.value)}
          >
            <p className={styles.columnTitle}>
              {statusData.label}&nbsp;&#40;
              {tasks ? tasks.meta.statusCounts[statusData.value] : "?"}
              &#41;
            </p>
            {filteredTasks?.map((task) => {
              return (
                <TaskCard
                  setTaskToDelete={setTaskToDelete}
                  key={task.id}
                  data={task}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
