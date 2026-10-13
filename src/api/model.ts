export const TASK_STATUSES = [
  { value: "backlog", label: "Бэклог" },
  { value: "todo", label: "К выполнению" },
  { value: "inProgress", label: "В работе" },
  { value: "review", label: "Ревью" },
  { value: "readyForRelease", label: "Готово к релизу" },
  { value: "onHold", label: "На паузе" },
  { value: "done", label: "Выполнено" },
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number]["value"];

interface EntityDescription {
  id: number;
  name: string;
}

export type TaskStatusCounts = Record<TaskStatus, number>;

export interface Task {
  id: number;
  title: string;
  description: string;
  executor: EntityDescription;
  status: TaskStatus;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskListResponse {
  data: Task[];
  total: number;
  meta: {
    limit: number;
    offset: number;
    executorId: number;
    statusCounts: TaskStatusCounts;
  };
}

export interface TaskRequest {
  title: string;
  description: string;
  executorId: number;
  status: TaskStatus;
  deadline: string | null;
}
