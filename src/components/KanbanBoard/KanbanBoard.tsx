import { useEffect, useState } from "react";
import { TASK_STATUSES, type TaskListResponse } from "../../api/model";
import styles from "./KanbanBoard.module.scss";
import { getTasks } from "../../api/getTasks";
import { TaskCard } from "../TaskCard/TaskCard";

export function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskListResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      {TASK_STATUSES.map((statusData) => {
        const filteredTasks = tasks?.data.filter(
          (task) => task.status === statusData.value,
        );
        return (
          <div key={statusData.value} className={styles.column}>
            <p className={styles.columnTitle}>
              {statusData.label}&nbsp;&#40;
              {tasks ? tasks.meta.statusCounts[statusData.value] : "?"}
              &#41;
            </p>
            {filteredTasks?.map((task) => {
              return <TaskCard key={task.id} data={task} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
