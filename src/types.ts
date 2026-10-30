import type { TASK_STATUSES } from "./api/constants";

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

export type TaskDataForSubmit = Pick<
  Task,
  "title" | "description" | "status"
> & {
  deadline: string | null;
  id?: Task["id"];
};

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
