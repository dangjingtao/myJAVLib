export interface Log {
  type?: string;
  id: number | string;
  level: "info" | "error" | "warn" | "success";
  message: string;
  timestamp: string;
}
