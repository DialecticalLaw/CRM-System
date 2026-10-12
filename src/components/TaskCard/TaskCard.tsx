import type { Task } from "../../api/model";

export function TaskCard({ data }: { data: Task }) {
  return (
    <div>
      <p>{data.title}</p>
    </div>
  );
}
