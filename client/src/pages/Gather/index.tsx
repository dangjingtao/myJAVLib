import { Input, Button, Space, Tabs, TabPane, Spin } from "@douyinfe/semi-ui";

import { IconSearch, IconFolderOpen } from "@douyinfe/semi-icons";
// 在渲染进程中
import { SplitPane } from "@/components/Split";
import json from "./r";
import LogPane from "./component/LogPane";
import MovieDetailPane from "./component/MovieDetailPane";
import ScanDirPane from "./component/ScanDirPane";
import styles from "./styles.module.less";
import useLogger from "@/hooks/useLogger";

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gatherType, setGatherType] = useState<any>("dir");
  const [outfit, setOutfit] = useState("JUFD-455");

  const { loggerInfo, setLoggerInfo } = useLogger({
    onUpdate: (pre, info) => {
      return [...pre, { ...info, type: gatherType }];
    },
    deps: [gatherType],
  });
  const [result, setResult] = useState(json);
  const refDom = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setOutfit("JUFD-465");
  }, [gatherType]);

  const [logPaneHeight, setLogPaneHeight] = useState(160);
  const [tabPaneHeight, setTabPaneHeight] = useState(0);
  const [w, setW] = useState<number>(1000);

  useEffect(() => {
    const onResize = () => {
      const topWrap: HTMLElement | null | undefined = document
        .querySelector("#gathering")
        ?.querySelector(".semi-tabs-bar");
      const tw = (topWrap?.offsetWidth || 1250) - 250;
      setW(tw);
    };
    onResize();
    const onMyResize = () => window.setTimeout(onResize, 200);
    window.addEventListener("resize", onResize);
    window.addEventListener("my_resize", onMyResize);
    calcPaneHeight(logPaneHeight);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("my_resize", onMyResize);
    };
  }, [logPaneHeight]);

  const calcPaneHeight = (logHeight: number) => {
    const wrapDom: HTMLElement | null = document.querySelector(
      ".semi-layout-content"
    );
    const h = wrapDom?.offsetHeight || 0;
    setTabPaneHeight(h - logHeight - 80);
  };

  const onChangeSplitPane = (logHeight: number) => {
    setLogPaneHeight(logHeight);
    calcPaneHeight(logHeight);
  };

  const queryByOutfit = async () => {
    setLoading(true);
    const res = await window.app?.queryDataByOutfit(outfit);
    setResult(res.data);
    setLoading(false);
  };

  const currentLoggerInfo = loggerInfo.filter((x) => x.type === gatherType);
  const cleanCurLog = () => {
    const otherInfo = loggerInfo.filter((x) => x.type !== gatherType);
    setLoggerInfo(otherInfo);
  };

  return (
    <div className={styles.wrap}>
      <SplitPane
        primary="second"
        split="horizontal"
        // size={180}
        minSize={160}
        // maxSize={180}
        paneStyle={{ overflow: "auto" }}
        style={{ userSelect: "auto" }}
        onChange={onChangeSplitPane}
        onToggleClick={(isMin) => {
          onChangeSplitPane(isMin ? 0 : 160);
        }}
      >
        <div id="gathering" className={styles.gatheringWrap}>
          <Tabs
            onChange={setGatherType}
            style={{ padding: "0px 10px" }}
            activeKey={gatherType}
            tabBarExtraContent={
              <>
                {gatherType === "outfit" ? (
                  <Input
                    disabled={loading}
                    style={{ width: w }}
                    placeholder="输入番号即可采集"
                    suffix={<IconSearch />}
                    value={outfit}
                    showClear
                    onChange={setOutfit}
                    onEnterPress={queryByOutfit}
                  />
                ) : (
                  <Button
                    style={{ width: w }}
                    block
                    onClick={async () => {
                      const res = await window.app?.openPathDialog();
                      const initPath = res[0];
                      await window.app?.indexMovie({
                        initPath,
                      });
                      if (res[0]) {
                        setDir(res[0]);
                      }
                    }}
                  >
                    {dir ? (
                      dir
                    ) : (
                      <Space>
                        <IconFolderOpen />
                        <span>选择本地文件夹</span>
                      </Space>
                    )}
                  </Button>
                )}
              </>
            }
          >
            <TabPane
              disabled={gatherType !== "outfit" && loading}
              style={{ height: tabPaneHeight, overflow: "auto" }}
              tab={"按番号搜索"}
              itemKey={`outfit`}
              key={"outfit"}
            >
              <Spin spinning={loading}>
                <MovieDetailPane record={result} />
              </Spin>
            </TabPane>
            <TabPane
              disabled={gatherType !== "dir" && loading}
              style={{ height: tabPaneHeight, overflow: "auto" }}
              tab={"浏览文件夹"}
              itemKey={`dir`}
              key={"dir"}
            >
              <Spin spinning={loading}>
                <ScanDirPane
                  height={tabPaneHeight}
                  scanInfo={currentLoggerInfo}
                />
              </Spin>
            </TabPane>
          </Tabs>
        </div>
        <div ref={refDom} className={styles.loggerPaneWrap}>
          <LogPane
            type={gatherType}
            cleanLog={cleanCurLog}
            loggerInfo={currentLoggerInfo}
            height={logPaneHeight}
          />
        </div>
      </SplitPane>
    </div>
  );
};

export default Index;
