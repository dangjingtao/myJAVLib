/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  Empty,
  Typography,
  Tooltip,
  Notification,
  Space,
} from "@douyinfe/semi-ui";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";
// import { SketchPicker, MaterialPicker } from "react-color";

import EditModal from "./ components/EditModal";
import type { Row } from "./types";

const { Text } = Typography;

const renderContent = (text: string) => {
  if (text === "" || text === null) {
    return <div style={{ textAlign: "center" }}>--</div>;
  }
  return (
    <Tooltip position="right" content={text}>
      <div
        style={{
          width: "90",
          display: "block",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {text}
      </div>
    </Tooltip>
  );
};

function App({
  title,
  tableName,
  columns,
  EditModal: CustEditModal,
  virtualized,
  style,
}) {
  const EditDetailModal = CustEditModal || EditModal;
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollProp, setScrollProp] = useState<{
    y: number | string;
    x: string | number;
  }>({ y: 600, x: "100%" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editVisible, setEditVisible] = useState(false);
  const [currenRow, setCurrentRow] = useState<Row | null>(null);

  columns.forEach((x) => {
    const { render } = x;
    if (!render) {
      x.render = renderContent;
    }
  });

  columns.push({
    title: "操作",
    dataIndex: "operate",
    fixed: true,
    width: 90,
    render: (_text: unknown, content: Row) => {
      return (
        <Space>
          <Text
            style={{
              cursor: "pointer",
              color: "var(--semi-color-link-visited)",
            }}
            link
            onClick={() => {
              setCurrentRow(content);
              setEditVisible(true);
            }}
          >
            更多
          </Text>
        </Space>
      );
    },
  });

  useEffect(() => {
    const onResize = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapDom: Element | any = document.querySelector(
        ".semi-layout-content"
      );
      const h = wrapDom?.offsetHeight;
      const w = wrapDom?.offsetWidth;
      setScrollProp({ y: h - 140, x: w - 40 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const query = async (params) => {
    setLoading(true);
    const res = await window.app?.getBaseDataByTableName({
      tableName,
      params: {
        ...params,
      },
    });
    console.log(res);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    query({});
  }, []);

  const handleRow: any = (_record: Row, index: number) => {
    // 给偶数行设置斑马纹
    if (index % 2 === 0) {
      return {
        style: {
          background: "var(--semi-color-fill-0)",
        },
      };
    } else {
      return {};
    }
  };

  return (
    <>
      <div style={{ marginBottom: 10, display: "flex" }}>
        <h2 style={{ margin: "0 20px 0 0" }}>{title}</h2>
      </div>
      <Table
        bordered
        virtualized={virtualized}
        rowKey={"id"}
        size="small"
        // style={{ width: "100%" }}
        columns={columns}
        dataSource={dataSource}
        empty={
          <Empty
            description={<div style={{ marginBottom: 200 }}>找不到</div>}
            image={
              <IllustrationNoResult
                style={{ marginTop: 200, width: 150, height: 150 }}
              />
            }
          />
        }
        scroll={{ y: scrollProp.y }}
        pagination={false}
        loading={loading}
        // virtualized
        style={{ margin: "0 auto", ...style }}
        onRow={handleRow}
        resizable
      />
      <EditDetailModal
        currentRow={currenRow}
        visible={editVisible}
        handleOk={async (params: Row) => {
          const res = await window.app.updateBaseDataByTableName({
            tableName,
            params,
          });
          console.log(params, res);
          return res?.success;
        }}
        afterOk={async () => {
          await query({});
          Notification.success({
            title: "修改成功",
            position: "bottomRight",
            duration: 3,
          });
        }}
        onCancel={() => {
          setEditVisible(false);
          setCurrentRow(null);
        }}
      />
    </>
  );
}

export default App;
