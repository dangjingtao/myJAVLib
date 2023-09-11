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
} from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

import { IconSearch } from "@douyinfe/semi-icons";
// 在渲染进程中
import { io } from "socket.io-client";
import { Pane, SplitPane } from "@/components/Split";

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
        minSize={100}
        maxSize={400}
        paneStyle={{ overflow: "auto" }}
        style={{ userSelect: "auto" }}
      >
        <div style={{ padding: 10, overflow: "auto" }}>
          <InputGroup
            style={{
              marginTop: 20,
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
              >
                选择本地文件夹{" "}
                <>
                  {fileList.length ? <>：已选中 {fileList.length}个</> : null}
                </>
                <input
                  style={{
                    display: "block",
                    // position: "absolute",
                    // top: 0,
                    // left: 0,
                    // opacity: 0,
                    // width: "100%",
                    height: 40,
                  }}
                  type="file"
                  webkitdirectory="true"
                  // multiple
                  onChange={(e) => {
                    setFileList(e.target.files);
                  }}
                ></input>
              </Button>
            )}
          </InputGroup>

          {result ? (
            <Card
              title={result?.outfit + "  " + result?.titleCN}
              style={{ marginTop: "20px" }}
              headerExtraContent={<Text link>入库</Text>}
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
                <IllustrationConstruction style={{ width: 150, height: 150 }} />
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
        <div
          ref={refDom}
          style={{
            width: "100%",
            background: "#f0f0f0",
            display: "flex",
            overflow: "auto",
          }}
        >
          <pre
            style={{
              flex: 1,
              height: "100%",
              borderRadius: "10px",
              padding: "0 10px", //aa
              margin: 0,
              // overflow: "auto",
              // position: "absolute",
              // bottom: -10,
              width: "100%",
            }}
          >
            {loggerInfo.map((x) => {
              return (
                <div style={{}} key={x.id}>
                  {x.message}
                </div>
              );
            })}
          </pre>
        </div>
      </SplitPane>

      {/* <Divider margin="12px" /> */}
    </div>
  );
};

export default Index;
