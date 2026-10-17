import { useEffect, useState } from "react";
import {
  TASK_STATUSES,
  type Task,
  type TaskHistoryResponse,
} from "../../api/model";
import { formatDuration } from "../../helpers/formatDuration";
import styles from "./TaskHistory.module.scss";
import { getHistory } from "../../api/getHistory";

export function TaskHistory({ details }: { details: Task | null }) {
  const [history, setHistory] = useState<TaskHistoryResponse | null>(null);

  useEffect(() => {
    if (!details) return;
    const loadHistory = async () => {
      const history = await getHistory(details.id);
      if (!history) return;
      setHistory(history);
    };
    loadHistory();
  }, [details]);

  if (!history) return null;

  const totalDuration = history.statusDurations.reduce(
    (acc, s) => acc + s.durationSeconds,
    0,
  );

  const statusesStats = history.statusDurations.map((s, i) => {
    return {
      key: i,
      status: s.status,
      duration: formatDuration(s.durationSeconds),
      percent: (s.durationSeconds / totalDuration) * 100,
      color:
        TASK_STATUSES.find((st) => st.value === s.status)?.color ||
        "transparent",
    };
  });

  return (
    <div className={styles.history}>
      <h2>Время по статусам</h2>
      <div className={styles.historyBar}>
        {statusesStats.map((data) => {
          console.log(data.percent);
          return (
            <div
              key={data.key}
              className={styles.statusDuration}
              title={`${
                TASK_STATUSES.find((s) => s.value === data.status)?.label ||
                "Неизвестно"
              } - ${data.duration}`}
              style={{
                width: `${data.percent < 1 ? 1 : data.percent}%`,
                backgroundColor: data.color,
              }}
            />
          );
        })}
      </div>

      <div className={styles.historyDetails}>
        {statusesStats.map((data) => {
          return (
            <p key={data.key} className={styles.historyDetail}>
              <span
                className={styles.historyDetailMarker}
                style={{ backgroundColor: data.color }}
              ></span>
              {TASK_STATUSES.find((s) => s.value === data.status)?.label ||
                "Неизвестно"}
              &nbsp;&middot;&nbsp;{data.duration}
            </p>
          );
        })}
      </div>
    </div>
  );
}
