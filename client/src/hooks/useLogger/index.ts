import { useState } from "react";
import { io } from "socket.io-client";
import type { Log } from "./types";
const useLogger = ({
  onLog,
  onUpdate,
  deps = [],
}: {
  onLog?: (logs: Log[]) => void;
  onUpdate?: (pre: Log[], info: Log) => Log[];
  deps?: unknown[];
}) => {
  const [loggerInfo, setLoggerInfo] = useState<Log[]>([]);

  useEffect(() => {
    const updateLogs = (info: Log) => {
      // console.log("收到logger消息", info);
      setLoggerInfo((pre: Log[]) => {
        if (onUpdate) {
          return onUpdate(pre, info);
        }
        const newList = [...pre, info];
        return newList;
      });
      window.setTimeout(() => {
        onLog && onLog([...loggerInfo, info]);
      }, 10);
    };
    const ws = io("http://localhost:9000");
    ws.on("logger", updateLogs);
    return () => {
      ws.off("logger", updateLogs);
    };
  }, deps);

  // useState(() => {
  //   const updateLogs = (info: Log) => {
  //     // console.log("收到logger消息", info);
  //     setLoggerInfo((pre: Log[]) => {
  //       if (onUpdate) {
  //         return onUpdate(pre, info);
  //       }
  //       const newList = [...pre, info];
  //       return newList;
  //     });
  //     window.setTimeout(() => {
  //       onLog && onLog([...loggerInfo, info]);
  //     }, 10);
  //   };
  //   const ws = io("http://localhost:9000");
  //   ws.on("logger", updateLogs);
  //   return () => {
  //     ws.off("logger", updateLogs);
  //   };
  // });

  return { loggerInfo, setLoggerInfo };
};

export default useLogger;
