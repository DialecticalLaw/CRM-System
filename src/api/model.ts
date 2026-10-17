export const TASK_STATUSES = [
  { value: "backlog", label: "Бэклог", color: "#272727" },
  { value: "todo", label: "К выполнению", color: "#005eff" },
  { value: "inProgress", label: "В работе", color: "#3cb4ff" },
  { value: "review", label: "Ревью", color: "#7125ff" },
  { value: "readyForRelease", label: "Готово к релизу", color: "#35b577" },
  { value: "onHold", label: "На паузе", color: "#ecff16" },
  { value: "done", label: "Выполнено", color: "#34ff59" },
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

export interface StatusDuration {
  status: TaskStatus;
  durationSeconds: number;
  startedAt: string;
  endedAt?: string;
}

export interface TaskHistoryResponse {
  statusDurations: StatusDuration[];
  generatedAt: string;
}
