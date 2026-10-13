export function localToUtc(value: string | null): string | null {
  return value ? new Date(value).toISOString() : null;
}

export function utcToLocal(value: string): string {
  // dd.mm.yyyy, hh:mm
  return value
    ? new Date(value).toLocaleString("ru-RU", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "";
}
