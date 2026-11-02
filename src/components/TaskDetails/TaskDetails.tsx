import { utcToInputValue, utcToLocal } from "../../helpers/date";
import { Button } from "../ui/Button/Button";
import styles from "./TaskDetails.module.scss";
import { TASK_STATUSES } from "../../api/constants";
import type { Task, TaskDataForSubmit } from "../../types";

export function TaskDetails({
  details,
  setTaskDetails,
  setTaskIdToDelete,
  setIsTaskModalActive,
  setTaskToEdit,
}: {
  details: Task | null;
  setTaskDetails: React.Dispatch<React.SetStateAction<Task | null>>;
  setTaskIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
  setIsTaskModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskDataForSubmit | null>>;
}) {
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
                setIsTaskModalActive(true);
              }}
            >
              Редактировать
            </Button>
            <Button
              classNames={[styles.deleteBtn]}
              onClick={() => setTaskIdToDelete(details.id)}
            >
              Удалить
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
