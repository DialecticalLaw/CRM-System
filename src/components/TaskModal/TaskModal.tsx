import { useState } from "react";
import {
  TASK_STATUSES,
  type TaskListResponse,
  type TaskStatus,
} from "../../api/model";
import { Textarea } from "../ui/inputs/Textarea/Textarea";
import styles from "./TaskModal.module.scss";
import { Select } from "../ui/inputs/Select/Select";
import { DateSelect } from "../ui/inputs/DateSelect/DateSelect";
import { localToUtc } from "../../helpers/date";
import { Button } from "../ui/Button/Button";
import { createTask } from "../../api/createTask";
import { getTasks } from "../../api/getTasks";
import { ValidationError } from "../ui/ValidationError/ValidationError";

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

type ErrorText =
  | "Поле обязательно для заполнения"
  | "Длина должна быть в пределах 4-64 символов"
  | null;

const STATUSES: TaskStatus[] = TASK_STATUSES.map((status) => status.value);

export function TaskModal({
  isTaskModalActive,
  setTaskModalActive,
  setTasks,
}: {
  isTaskModalActive: boolean;
  setTaskModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskListResponse | null>>;
}) {
  const [data, setData] = useState<SubmitData>(INITIAL_DATA);
  const [currentErrorText, setCurrentErrorText] = useState<ErrorText>(null);

  const validate = () => {
    if (!data.title) {
      setCurrentErrorText("Поле обязательно для заполнения");
      return false;
    } else if (data.title.length < 4 || data.title.length > 64) {
      setCurrentErrorText("Длина должна быть в пределах 4-64 символов");
      return false;
    } else {
      setCurrentErrorText(null);
      return true;
    }
  };

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

    const isValid = validate();
    if (!isValid) return;

    await createTask(dataToSend);
    const updatedList = await getTasks();
    setTasks(updatedList);
    setTaskModalActive(false);
    setData(INITIAL_DATA);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTaskModalActive(false);
          setData(INITIAL_DATA);
        }
      }}
      className={`${styles.blackout} ${isTaskModalActive ? styles.active : ""}`}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={() => setTaskModalActive(false)}
        >
          <img className={styles.closeIcon} src="/close.svg" alt="close" />
        </button>
        <h2 className={styles.title}>Новая задача</h2>

        <ValidationError text={currentErrorText || ""}>
          <Textarea
            name="title"
            rows={1}
            label="Название"
            required={true}
            onChange={handleChange}
            value={data.title}
          />
        </ValidationError>

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
              setTaskModalActive(false);
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
