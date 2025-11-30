import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
}

export const define = createDefine<State>();

export const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("default").format(date);
};

export const PHOTOS_DIR = "./static";
