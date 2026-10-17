import { useEffect, useState } from "react";
import {
  TASK_STATUSES,
  type Task,
  type TaskHistoryResponse,
} from "../../api/model";
import { utcToInputValue, utcToLocal } from "../../helpers/date";
import type { SubmitData } from "../TaskModal/TaskModal";
import { Button } from "../ui/Button/Button";
import styles from "./TaskDetails.module.scss";
import { getHistory } from "../../api/getHistory";
import { formatDuration } from "../../helpers/formatDuration";

export function TaskDetails({
  details,
  setTaskDetails,
  setTaskToDelete,
  setTaskModalActive,
  setTaskToEdit,
}: {
  details: Task | null;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
  setTaskToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setTaskModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskToEdit: React.Dispatch<
    React.SetStateAction<
      | (SubmitData & {
          id: number;
        })
      | null
    >
  >;
}) {
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

  console.log(history);

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
    <div className={`${styles.wrapper} ${details ? styles.active : ""}`}>
      {details && (
        <>
          <button
            className={styles.closeBtn}
            onClick={() => setTaskDetails(null)}
          >
            <img className={styles.closeIcon} src="/close.svg" alt="close" />
          </button>
          <p className={styles.minorText}>CRM-{details.id}</p>
          <h2 className={styles.title}>{details.title}</h2>

          <div className={styles.hr} />

          <div className={styles.infoWrapper}>
            <div className={styles.infoItem}>
              <p className={styles.label}>Статус</p>
              <p className={styles.info}>
                {TASK_STATUSES.find((s) => s.value === details.status)?.label ||
                  "Нет информации"}
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.label}>Дедлайн</p>
              <p className={styles.info}>
                {utcToLocal(details.deadline) || "Не задан"}
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.label}>Создана</p>
              <p className={styles.info}>
                {utcToLocal(details.createdAt) || "Нет информации"}
              </p>
            </div>
            <div className={styles.infoItem}>
              <p className={styles.label}>Обновлена</p>
              <p className={styles.info}>
                {utcToLocal(details.updatedAt) || "Нет информации"}
              </p>
            </div>
          </div>

          <div className={styles.hr} />

          <h2 className={styles.title}>Описание</h2>
          {details.description ? (
            <p className={styles.description}>{details.description}</p>
          ) : (
            <p className={styles.minorText}>Описание не добавлено</p>
          )}

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
                      TASK_STATUSES.find((s) => s.value === data.status)
                        ?.label || "Неизвестно"
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
                    {TASK_STATUSES.find((s) => s.value === data.status)
                      ?.label || "Неизвестно"}
                    &nbsp;&middot;&nbsp;{data.duration}
                  </p>
                );
              })}
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <Button
              onClick={() => {
                setTaskToEdit({
                  title: details.title,
                  description: details.description,
                  deadline: utcToInputValue(details.deadline) || null,
                  status: details.status,
                  id: details.id,
                });
                setTaskModalActive(true);
              }}
            >
              Редактировать
            </Button>
            <Button
              classNames={[styles.deleteBtn]}
              onClick={() => setTaskToDelete(details.id)}
            >
              Удалить
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
