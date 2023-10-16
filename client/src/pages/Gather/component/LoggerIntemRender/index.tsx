// import { Button, Tabs, TabPane, Badge, Space } from "@douyinfe/semi-ui";
// import { IconDelete, IconArticle } from "@douyinfe/semi-icons";
import type { Log, LogStyle } from "../../types";
const logStyles: LogStyle = {
  info: {},
  error: {
    color: "red",
  },
  warn: {
    color: "yellow",
  },
  success: {
    color: "green",
  },
};
const LoggerItemRender = ({ level, message }: Log) => {
  return (
    <p style={{ lineHeight: 2, padding: 0, margin: "0", ...logStyles[level] }}>
      {message}
    </p>
  );
};

export default LoggerItemRender;
