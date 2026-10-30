export const TASK_STATUSES = [
  { value: "backlog", label: "Бэклог", color: "#272727" },
  { value: "todo", label: "К выполнению", color: "#005eff" },
  { value: "inProgress", label: "В работе", color: "#3cb4ff" },
  { value: "review", label: "Ревью", color: "#7125ff" },
  { value: "readyForRelease", label: "Готово к релизу", color: "#35b577" },
  { value: "onHold", label: "На паузе", color: "#ecff16" },
  { value: "done", label: "Выполнено", color: "#34ff59" },
] as const;
