import {
  Row,
  Col,
  InputGroup,
  Input,
  Divider,
  InputNumber,
  AutoComplete,
  DatePicker,
  Select,
  Upload,
  Button,
  Card,
  Typography,
  List,
  Table,
  Tag,
  Space,
  Empty,
  Tabs,
  TabPane,
  Checkbox,
  CheckboxGroup,
} from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";
import "./style.less";

import { IconSearch } from "@douyinfe/semi-icons";
// 在渲染进程中
import { io } from "socket.io-client";
import { Pane, SplitPane } from "@/components/Split";
import json from "./result";

const { Text } = Typography;

const getColor = () => {
  const i = Math.floor(17 * Math.random());
  const colorGroup = [
    "amber",
    "blue",
    "cyan",
    "green",
    "grey",
    "indigo",
    "light-blue",
    "light-green",
    "lime",
    "orange",
    "pink",
    "purple",
    "red",
    "teal",
    "violet",
    "yellow",
    "white",
  ];
  return colorGroup[i];
};

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gatherType, setGatherType] = useState<any>("outfit");
  const [fileList, setFileList] = useState([]);
  const [outfit, setOutfit] = useState("JUFD-465");
  const [loggerInfo, setLoggerInfo] = useState([]);
  const [result, setResult] = useState(null);

  const refDom = useRef<any>(null);

  const updateLogs = (info) => {
    // console.log("收到logger消息", info);
    setLoggerInfo((pre) => {
      const newList = [...pre, { id: pre.length + 1, ...info }];
      return newList;
    });
    window.setTimeout(() => {
      if (refDom.current) {
        refDom.current.scrollTop = refDom.current?.scrollHeight;
      }
    }, 10);
  };

  useState(() => {
    const ws = io("http://localhost:9000");
    ws.on("logger", updateLogs);
    return () => {
      ws.off("logger", updateLogs);
    };
  }, []);

  useEffect(() => {
    setFileList([]);
    setOutfit("JUFD-465");
  }, [gatherType]);

  const yiku = async () => {
    const res = await window.app?.yiku({ record: result });
    console.log(res);
  };
  const [w, setW] = useState(0);
  useEffect(() => {
    const onResize = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapDom: Element | any = document.querySelector(
        ".semi-layout-content"
      );
      const w = wrapDom?.offsetWidth;
      setW(w);
    };
    onResize();
    const onMyResize = () => window.setTimeout(onResize, 200);
    window.addEventListener("resize", onResize);
    window.addEventListener("my_resize", onMyResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("my_resize", onMyResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        // margin: "-24px -24px 0",
      }}
    >
      <SplitPane
        primary="second"
        split="horizontal"
        // size={180}
        minSize={160}
        // maxSize={180}
        paneStyle={{ overflow: "auto" }}
        style={{ userSelect: "auto" }}
        // on
      >
        <div
          id="gathering"
          style={{
            padding: "0px 10px",
            overflow: "auto",
            position: "relative",
            paddingTop: 50,
          }}
        >
          <div
            style={{
              position: "fixed",
              zIndex: 99999,
              width: w - 26,
              // right: 30,
              // left: 30,
              top: 96,
              background: "#fff",
              height: 60,
            }}
          >
            <InputGroup
              style={{
                marginTop: 4,
                display: "flex",
                width: "100%",
                backgroundColor: "#fff",
              }}
              size={"large"}
            >
              <Select
                style={{ width: "140px" }}
                value={gatherType}
                onChange={(val) => {
                  setGatherType(val);
                }}
              >
                <Select.Option value="outfit">番号</Select.Option>
                <Select.Option value="dir">文件夹</Select.Option>
              </Select>
              {gatherType === "outfit" ? (
                <Input
                  style={{ flex: 1 }}
                  placeholder="输入番号即可采集"
                  suffix={<IconSearch />}
                  value={outfit}
                  showClear
                  onChange={setOutfit}
                  onEnterPress={async () => {
                    const res = await window.app?.queryDataByOutfit(outfit);
                    console.log(res);
                    setResult(res.data);
                  }}
                />
              ) : (
                <Button
                  style={{ flex: 1, height: "40px", position: "relative" }}
                  block
                  theme="solid"
                  type="tertiary"
                  onClick={async () => {
                    const res = await window.app?.openPathDialog();
                    const initPath = res[0];
                    const rs = await window.app?.indexMovie({
                      initPath,
                    });
                    console.log(rs);
                  }}
                >
                  选择本地文件夹
                </Button>
              )}
            </InputGroup>
          </div>

          <Tabs
            style={
              {
                // width: "100%",
                // height: 0,
                // overflow: "hidden",
                // margin: "20px",
              }
            }
            type="card"
            collapsible
            activeKey={gatherType}
          >
            <TabPane tab={`outfit`} itemKey={`outfit`} key={"outfit"}>
              {result ? (
                <Card
                  title={
                    <>
                      <h2
                        style={{
                          marginTop: 0,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div>
                          {result?.outfit + "  " + result?.titleCN + "   "}
                        </div>
                        <Text
                          style={{ display: "block", marginLeft: "auto" }}
                          link
                          onClick={yiku}
                        >
                          入库
                        </Text>
                      </h2>
                      <Space wrap>
                        {result?.tags?.map((x) => (
                          <Tag color={getColor()} key={x.code}>
                            {x.name}
                          </Tag>
                        ))}
                      </Space>
                    </>
                  }
                  style={{ margin: "10px 0 0" }}
                  cover={
                    <div style={{ display: "flex" }}>
                      <div style={{ maxWidth: 800 }}>
                        <img
                          style={{ width: "100%" }}
                          src={result?.airav?.img_url}
                        ></img>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div>
                          <Table
                            bordered
                            size="small"
                            sticky={{ top: 60 }}
                            scroll={{ y: 500 }}
                            columns={[
                              {
                                title: "磁力链",
                                dataIndex: "name",
                                width: 250,
                                render: (text, record, index) => {
                                  return (
                                    <a
                                      href={record.link}
                                      style={{
                                        display: "block",
                                        width: "90%",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                      }}
                                    >
                                      {`[${record.date}] `}
                                      {text}
                                      {`(${record.size})`}
                                    </a>
                                  );
                                },
                              },
                            ]}
                            dataSource={result?.magnets}
                            pagination={false}
                          />
                        </div>
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: 0 }}
                  headerStyle={{ padding: "20px 20px 10px" }}
                >
                  <p style={{ padding: 10 }}>{result.description_CN}</p>
                </Card>
              ) : (
                <Empty
                  style={{ margin: 200 }}
                  image={
                    <IllustrationConstruction
                      style={{ width: 150, height: 150 }}
                    />
                  }
                  darkModeImage={
                    <IllustrationConstructionDark
                      style={{ width: 150, height: 150 }}
                    />
                  }
                  title={"🐻快来搜一搜吧"}
                  description="当前功能只支持骑兵"
                />
              )}
            </TabPane>
            <TabPane tab={`dir`} itemKey={`dir`} key={"dir"}>
              <CheckboxGroup
              // value={checkboxVal}
              // onChange={(value) => setCV(value)}
              >
                <List
                  header={<div>111</div>}
                  // dataSource={getData(page)}
                  dataSource={[
                    "从明天起，做一个幸福的人",
                    "喂马，劈柴，周游世界",
                    "从明天起，关心粮食和蔬菜",
                    "我有一所房子，面朝大海，春暖花开",
                  ]}
                  className="component-list-demo-booklist"
                  // size="small"
                  // bordered
                  split
                  style={{
                    marginTop: 10,
                    // border: "1px solid var(--semi-color-border)",
                    flexBasis: "100%",
                    flexShrink: 0,
                  }}
                  renderItem={(item) => (
                    <List.Item className="list-item">
                      <Checkbox value={item}>{item}</Checkbox>
                    </List.Item>
                  )}
                />
              </CheckboxGroup>
            </TabPane>
          </Tabs>

          {/* <div style={{ display: gatherType === "outfit" ? "block" : "none" }}>
            {result ? (
              <Card
                title={result?.outfit + "  " + result?.titleCN}
                style={{ marginTop: "20px" }}
                headerExtraContent={
                  <Text link onClick={yiku}>
                    入库
                  </Text>
                }
                cover={
                  <Row>
                    <Col span={16}>
                      <img
                        style={{ width: "100%" }}
                        src={result?.airav?.img_url}
                      ></img>
                    </Col>
                    <Col span={8}>
                      <div style={{ padding: "0 10px" }}>
                        <Space wrap>
                          {result?.tags.map((x) => (
                            <Tag color={getColor()} key={x.code}>
                              {x.name}
                            </Tag>
                          ))}
                        </Space>
                        <p>{result.description_CN}</p>
                        <Table
                          bordered
                          size="small"
                          sticky={{ top: 60 }}
                          scroll={{ y: 350 }}
                          columns={[
                            {
                              title: "磁力链",
                              dataIndex: "name",
                              width: 250,

                              render: (text, record, index) => {
                                return (
                                  <a
                                    href={record.link}
                                    style={{
                                      display: "block",
                                      width: "90%",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {text}
                                    {`(${record.size})`}
                                  </a>
                                );
                              },
                            },

                            {
                              title: "更新日期",
                              dataIndex: "date",
                              // width: 140,
                              // fixed: true,
                            },
                          ]}
                          dataSource={result?.magnets}
                          pagination={false}
                        />
                      </div>
                    </Col>
                  </Row>
                }
                bodyStyle={{ padding: 0 }}
              ></Card>
            ) : (
              <Empty
                style={{ margin: 200 }}
                image={
                  <IllustrationConstruction
                    style={{ width: 150, height: 150 }}
                  />
                }
                darkModeImage={
                  <IllustrationConstructionDark
                    style={{ width: 150, height: 150 }}
                  />
                }
                title={"🐻快来搜一搜吧"}
                description="当前功能只支持骑兵"
              />
            )}
          </div>
          <div style={{ display: gatherType === "dir" ? "block" : "none" }}>
            文件夹
          </div> */}
        </div>
        <div
          ref={refDom}
          style={{
            width: "100%",
            // background: "#f0f0f0",
            display: "flex",
            overflow: "auto",
            paddingTop: "4px",
          }}
        >
          <Tabs
            style={{ width: "100%" }}
            type="card"
            tabPaneMotion={false}
            tabBarExtraContent={
              <>
                <Button
                  onClick={() => {
                    setLoggerInfo([]);
                  }}
                >
                  detail
                </Button>
                <Button
                  onClick={() => {
                    setLoggerInfo([]);
                  }}
                >
                  clean
                </Button>
              </>
            }
          >
            <TabPane tab="调试控制台" itemKey="1">
              <pre
                style={{
                  // flex: 1,

                  height: "100%",
                  minHeight: "100px",
                  maxHeight: "400px",
                  overflow: "auto",
                  borderRadius: "10px",
                  padding: "0 10px", //aa
                  margin: 0,
                  background: "#f0f0f0",
                  // overflow: "auto",
                  // position: "absolute",
                  // bottom: -10,
                  width: "100%",
                }}
              >
                {loggerInfo.map((x) => {
                  return (
                    <p style={{}} key={x.id}>
                      {x.message}
                    </p>
                  );
                })}
              </pre>
            </TabPane>
            <TabPane tab="问题" itemKey="2">
              <pre
                style={{
                  // flex: 1,

                  height: "100%",
                  minHeight: "100px",
                  maxHeight: "400px",
                  overflow: "auto",
                  borderRadius: "10px",
                  padding: "0 10px", //aa
                  margin: 0,
                  background: "#f0f0f0",
                  // overflow: "auto",
                  // position: "absolute",
                  // bottom: -10,
                  width: "100%",
                }}
              >
                {/*  */}
              </pre>
            </TabPane>
          </Tabs>
        </div>
      </SplitPane>

      {/* <Divider margin="12px" /> */}
    </div>
  );
};

export default Index;
