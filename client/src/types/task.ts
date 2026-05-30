export type TaskStatus =
  | "Backlog"
  | "In Progress"
  | "Done";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};