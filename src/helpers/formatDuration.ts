export const formatDuration = (totalSeconds: number): string => {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} д`);
  if (hours > 0) parts.push(`${hours} ч`);
  if (days === 0 && minutes > 0) parts.push(`${minutes} мин`);

  return parts.length > 0 ? parts.join(" ") : "< 1 мин";
};
