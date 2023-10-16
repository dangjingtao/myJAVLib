import { Button, Tabs, TabPane, Badge, Space } from "@douyinfe/semi-ui";
import { IconDelete, IconArticle } from "@douyinfe/semi-icons";
// import { IconSearch } from "@douyinfe/semi-icons";
import styles from "./styles.module.less";
import type { Log } from "../../types";
import { ForwardedRef } from "react";
import LoggerItemRender from "../LoggerIntemRender";

type Callback = {
  getcurrentLoggerInfo: () => unknown;
};

// (instance: T | null) => void) | MutableRefObject<T | null> | null
const Index = (
  {
    type,
    height,
    loggerInfo,
    cleanLog,
  }: {
    type: "outfit" | "dir";
    height: number;
    loggerInfo: Log[];
    cleanLog: () => void;
  },
  ref: ForwardedRef<Callback>
) => {
  const currentLoggerInfo = loggerInfo.filter((x) => x.type === type);
  const refDom = useRef<HTMLPreElement>(null);
  const refErrDom = useRef<HTMLPreElement>(null);

  useImperativeHandle(ref, () => ({
    getcurrentLoggerInfo: () => currentLoggerInfo,
  }));

  const mainLogs = loggerInfo.map((log: Log, i) => {
    return <LoggerItemRender {...log} key={i} />;
  });

  const errLogs = loggerInfo
    .filter((x: Log) => x.level === "error")
    .map((log: Log, i) => {
      return <LoggerItemRender {...log} key={i} />;
    });

  return (
    <Tabs
      style={{ width: "100%" }}
      type="card"
      tabPaneMotion={false}
      tabBarExtraContent={
        <>
          <Button
            onClick={() => {
              // setcurrentLoggerInfo ([]);
            }}
          >
            <IconArticle />
          </Button>
          <Button onClick={cleanLog}>
            <IconDelete />
          </Button>
        </>
      }
    >
      <TabPane tab="调试控制台" itemKey="1">
        <pre
          ref={refDom}
          className={styles.pane}
          style={{ height: height - 40 }}
        >
          {mainLogs}
        </pre>
      </TabPane>
      <TabPane
        tab={
          <Space>
            <span>错误</span>
            {errLogs.length === 0 ? null : (
              <Badge theme="light" count={errLogs.length} type="danger"></Badge>
            )}
          </Space>
        }
        itemKey="2"
      >
        <pre
          ref={refErrDom}
          className={styles.pane}
          style={{ height: height - 40 }}
        >
          {errLogs}
        </pre>
      </TabPane>
    </Tabs>
  );
};

const Pane = forwardRef(Index);

export default Pane;
