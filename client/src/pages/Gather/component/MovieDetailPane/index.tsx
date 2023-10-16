import { Card, Typography, Table, Tag, Space } from "@douyinfe/semi-ui";
import EmptyContent from "@/components/EmptyContent";

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

const DetailPane = ({ record }: { record?: unknown }) => {
  const yiku = async () => {
    const res = await window.app?.yiku({ record: record });
    console.log(res);
  };

  console.log(record);

  return (
    <>
      {record ? (
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
                  {record?.outfit +
                    "  " +
                    (record?.titleCN || record?.title) +
                    "   "}
                </div>
                <Text
                  style={{ display: "block", marginLeft: "auto" }}
                  link
                  onClick={yiku}
                >
                  入库
                </Text>
              </h2>
            </>
          }
          style={{ margin: "10px 0 0" }}
          cover={
            <div style={{ display: "flex" }}>
              <div style={{ maxWidth: 800 }}>
                <img
                  style={{ width: "100%" }}
                  src={record?.airav?.img_url || `atom://${record?.localCover}`}
                ></img>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ padding: 10, minHeight: 35, display: "flex" }}>
                  <div style={{ width: 60, fontSize: 16, fontWeight: "bold" }}>
                    艺术家
                  </div>
                  <div style={{ flex: 1 }}>
                    <Space wrap>
                      {record.actress.map((x) => (
                        <div key={x.code}>{x.name}</div>
                      ))}
                    </Space>
                  </div>
                </div>

                <div style={{ padding: 10, minHeight: 35, display: "flex" }}>
                  <div style={{ width: 60, fontSize: 16, fontWeight: "bold" }}>
                    标签
                  </div>
                  <div style={{ flex: 1 }}>
                    <Space wrap>
                      {record?.tags?.map((x) => (
                        <Tag color={getColor()} key={x.code}>
                          {x.name}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </div>

                <div style={{ padding: "0 10px" }}>
                  <Table
                    bordered
                    size="small"
                    sticky={{ top: 60 }}
                    scroll={{ y: 374 }}
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
                    dataSource={record?.magnets}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          }
          bodyStyle={{ padding: 0 }}
          headerStyle={{ padding: "20px 20px 10px" }}
        >
          <p style={{ padding: 10 }}>{record.description_CN}</p>
        </Card>
      ) : (
        <EmptyContent />
      )}
    </>
  );
};

export default DetailPane;
