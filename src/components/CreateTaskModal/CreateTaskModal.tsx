import { useState } from "react";
import { TASK_STATUSES, type TaskStatus } from "../../api/model";
import { Textarea } from "../ui/inputs/Textarea/Textarea";
import styles from "./CreateTaskModal.module.scss";
import { Select } from "../ui/inputs/Select/Select";
import { DateSelect } from "../ui/inputs/DateSelect/DateSelect";
import { localToUtc } from "../../helpers/date";
import { Button } from "../ui/Button/Button";
import { createTask } from "../../api/createTask";

interface SubmitData {
  title: string;
  description: string;
  deadline: string | null;
  status: TaskStatus;
}

const INITIAL_DATA: SubmitData = {
  title: "",
  description: "",
  deadline: null,
  status: "backlog",
};

const STATUSES: TaskStatus[] = TASK_STATUSES.map((status) => status.value);

export function CreateTaskModal({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [data, setData] = useState<SubmitData>(INITIAL_DATA);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      ...data,
      executorId: 1,
      deadline: localToUtc(data.deadline),
    };
    // isValid()
    setIsActive(false);
    setData(INITIAL_DATA);
    await createTask(dataToSend);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsActive(false);
          setData(INITIAL_DATA);
        }
      }}
      className={`${styles.blackout} ${isActive ? styles.active : ""}`}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={() => setIsActive(false)}>
          <img className={styles.closeIcon} src="/close.svg" alt="close" />
        </button>
        <h2 className={styles.title}>Новая задача</h2>

        <Textarea
          name="title"
          rows={1}
          label="Название"
          required={true}
          onChange={handleChange}
          value={data.title}
        />
        <Textarea
          name="description"
          rows={5}
          label="Описание"
          placeholder="Опишите задачу..."
          onChange={handleChange}
          value={data.description}
        />

        <Select
          label="Статус"
          name="status"
          onChange={handleChange}
          value={data.status}
          options={STATUSES}
        />
        <DateSelect
          label="Дедлайн"
          name="deadline"
          onChange={handleChange}
          value={data.deadline || ""}
        />
        <div className={styles.buttonsWrapper}>
          <Button
            classNames={[styles.cancelBtn]}
            type="reset"
            onClick={() => {
              setIsActive(false);
              setData(INITIAL_DATA);
            }}
          >
            Отмена
          </Button>
          <Button type="submit">Создать</Button>
        </div>
      </div>
    </form>
  );
}
