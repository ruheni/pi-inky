export const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr) return "Unknown";
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  return new Intl.DateTimeFormat("default").format(date);
};
