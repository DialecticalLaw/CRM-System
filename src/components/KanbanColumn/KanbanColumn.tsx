import { useState } from "react";
import type { Task, TaskListResponse, TaskStatus } from "../../api/model";
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./KanbanColumn.module.scss";
import { getTasks } from "../../api/getTasks";
import { isTask } from "../../helpers/isTask";
import { editTask } from "../../api/editTask";

export function KanbanColumn({
  statusData,
  setTaskToDelete,
  setTaskDetails,
  setTasks,
  tasks,
  filteredTasks,
}: {
  statusData: { label: string; value: TaskStatus };
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
  tasks: TaskListResponse | null;
  filteredTasks?: Task[];
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
            setTaskDetails={setTaskDetails}
            setTaskToDelete={setTaskToDelete}
            key={task.id}
            data={task}
          />
        );
      })}
    </div>
  );
}
