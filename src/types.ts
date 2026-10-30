import type { TaskStatus } from "./api/apiTypes";

export interface SubmitData {
  title: string;
  description: string;
  deadline: string | null;
  status: TaskStatus;
}
