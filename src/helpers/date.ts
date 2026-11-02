export function localToUtc(value: string | null): string | null {
  return value ? new Date(value).toISOString() : null;
}

export function utcToLocal(value: string | undefined): string {
  // dd.mm.yyyy, hh:mm
  return value
    ? new Date(value).toLocaleString("ru-RU", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "";
}

export function utcToInputValue(value: string | undefined): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return shifted.toISOString().slice(0, 16); // "yyyy-mm-ddThh:mm"
}
