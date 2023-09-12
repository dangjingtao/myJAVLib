/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Row,
  Card,
  Typography,
  Image,
  ImagePreview,
  Descriptions,
  Tag,
  Space,
  Rating,
  Popover,
  Modal,
  Table,
} from "@douyinfe/semi-ui";

import { DICT } from "./constants";
import { fileSchemaUrl, videoSchemaUrl } from "@/lib";

import Player from "@/components/Player";
import json from "./JUFD-448.json";

const { Text } = Typography;

const Detail = () => {
  const [visible, setVisible] = useState(false);
  const onClose = () => setVisible(false);
  const onOpen = (url: string) => {
    if (url?.endsWith("avi")) {
      window?.app?.invokeShell("openPath", url);
    } else {
      setVisible(true);
    }
  };

  const data = DICT.map((x) => {
    const key = <span style={{ fontSize: 16 }}>{x.name}</span>;
    if (x.code === "tags") {
      const ts = json[x.code] || [];
      console.log(ts);
      return {
        key,
        value: (
          <Space wrap>
            {ts.map((t: any) => {
              return (
                <Tag size="large" key={t.code}>
                  {t.name}
                </Tag>
              );
            })}
          </Space>
        ),
      };
    }
    if (x.code === "actress") {
      const actress =
        json[x.code]?.length !== 0 ? json[x.code] || undefined : undefined;
      return {
        key,
        value: (
          <Space wrap>
            {actress?.map((t: any, i: number) => {
              return (
                <Popover
                  key={t.href}
                  content={
                    <Card
                      style={{ maxWidth: 180, cursor: "pointer" }}
                      cover={
                        <img src={fileSchemaUrl(json.localActress[i])}></img>
                      }
                    >
                      {actress[i].name_jp}
                    </Card>
                  }
                >
                  <Text link={true} underline key={t.code}>
                    <span style={{ fontSize: 14, color: "#4687c7" }}>
                      {t?.name || "暂无艺术家信息"}
                    </span>
                  </Text>
                </Popover>
              );
            }) || "暂无该艺术家资讯"}
          </Space>
        ),
      };
    }
    if (x.code === "rating") {
      return {
        key,
        value: <Rating size="small" allowClear={true} defaultValue={4.1} />,
      };
    }

    if (x.code === "localSoursce") {
      return {
        key,
        value: (
          <>
            {json[x.code] ? (
              <Text link underline onClick={() => onOpen(json[x.code])}>
                <span style={{ fontSize: 16 }}>{json[x.code]}</span>
              </Text>
            ) : (
              "你还未获得该片"
            )}
          </>
        ),
      };
    }

    return {
      key: <span style={{ fontSize: 16 }}>{x.name}</span>,
      value: json[x.code]?.text,
    };
  }).filter((x) => !!x.value);

  return (
    <div>
      <Row gutter={[4, 16]}>
        <h2>{json?.outfit + "  " + (json.titleCN || json.title)} </h2>
      </Row>
      <Row gutter={[4, 16]}>
        <Col span={16}>
          <Card
            cover={
              <img alt="example" src={fileSchemaUrl(`${json.localCover}`)} />
            }
            bordered={false}
            bodyStyle={{ display: "none" }}
          />
        </Col>
        <Col span={7}>
          <Card bodyStyle={{ paddingTop: 0 }} bordered={false}>
            <p style={{ padding: "0 16px" }}>{json.description_CN}</p>
            <Descriptions data={data} />
          </Card>
        </Col>
      </Row>
      <h3>样品图像</h3>
      <Row>
        <ImagePreview>
          {json.localPreviews.map((src: string, index: number) => {
            return (
              <Image
                key={index}
                src={fileSchemaUrl(src)}
                width={200}
                alt={`preview${index + 1}`}
                style={{ marginRight: 5 }}
              />
            );
          })}
        </ImagePreview>
      </Row>
      <h3>磁力链</h3>
      <Table
        bordered
        size="small"
        // sticky={{ top: 60 }}
        scroll={{ y: 350 }}
        columns={[
          {
            title: "磁力链",
            dataIndex: "name",
            width: 450,
          },
          {
            title: "大小",
            dataIndex: "size",
            width: 120,
            // fixed: true,
          },

          {
            title: "更新日期",
            dataIndex: "date",
            width: 140,
            // fixed: true,
          },
          {
            title: "链接",
            dataIndex: "link",
            render: (text) => (
              <a
                href={text}
                style={{
                  display: "block",
                  width: "90%",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {text}
              </a>
            ),
          },
        ]}
        dataSource={json?.magnets}
        pagination={false}
      />
      {json?.airav?.maybe_like_videos ? <h3>也许还喜欢</h3> : null}
      <Row gutter={[10, 16]}>
        {json?.airav?.maybe_like_videos?.map((x) => {
          return (
            <Col key={x.barcode} span={3}>
              <Card
                bodyStyle={{
                  height: 60,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
                cover={<img src={x.img_url} />}
                title={x.barcode}
              >
                {x.name}
              </Card>
            </Col>
          );
        })}
      </Row>
      <div
        id="vedioModal"
        // style={{ position: "relative" }}
        className="semi-always-dark"
      >
        <Modal
          getPopupContainer={() =>
            document.querySelector("#vedioModal") || document.body
          }
          title={json.title}
          footer={null}
          fullScreen
          visible={visible}
          onOk={onClose}
          onCancel={onClose}
          bodyStyle={{ padding: 0 }}
        >
          <Player
            poster={fileSchemaUrl(json.localCover)}
            src={videoSchemaUrl(json.localSoursce)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Detail;
