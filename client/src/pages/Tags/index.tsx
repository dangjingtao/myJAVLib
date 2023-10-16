/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // Table,
  Empty,
  Typography,
  Tooltip,
  InputGroup,
  Input,
  Notification,
  Select,
  Space,
} from "@douyinfe/semi-ui";
import { IconSearch } from "@douyinfe/semi-icons";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";
// import { SketchPicker, MaterialPicker } from "react-color";
import { Table } from "antd";
import EditModal from "./ components/EditModal";
import type { Row } from "./types";
import { dict, subClass } from "./constants";
import useWrap from "@/hooks/useWrap";

const { Text } = Typography;

const renderContent = (text: string) => {
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

function App() {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollProp, setScrollProp] = useState<{
    y: number | string;
    x: string | number;
  }>({ y: 600, x: "100%" });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dimension, setDimension] = useState<any>("");
  const [searchWord, setSearchWord] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  const [currenRow, setCurrentRow] = useState<Row | null>(null);

  const columns = [
    {
      title: "中文",
      dataIndex: "zh_tw",
      width: 180,
      resize: true,
      sorter: (a: { zh_tw: string | any[] }, b: { zh_tw: string | any[] }) =>
        a.zh_tw.length - b.zh_tw.length > 0 ? 1 : -1,
      fixed: true,
      render: renderContent,
    },
    {
      title: "情感色",
      dataIndex: "color",
      width: 80,
      render: (color: string) => {
        return (
          <div
            style={{
              background: color || "#fff",
              border: "1px solid var(--semi-color-border)",
            }}
          >
            &nbsp;
          </div>
        );
      },
    },
    {
      title: "激活",
      dataIndex: "no_active",
      width: 70,
      filters: [
        { text: "是", value: 1 },
        { text: "否", value: 0 },
      ],
      onFilter: (value: number, record: Row) => {
        return Number(record.no_active) !== value;
      },
      render: (text: number) => {
        return !text ? "是" : "否";
      },
    },
    {
      title: "类别",
      dataIndex: "classType",
      width: 80,
      filters: Object.entries(dict).map((x) => ({ text: x[1], value: x[0] })),
      onFilter: (value: string, record: Row) => record.classType === value,
      render: (text: string) => {
        return dict[text];
      },
    },

    {
      title: "二级分类",
      dataIndex: "class",
      width: 100,
      filters: subClass.map((x: string) => ({ text: x, value: x })),
      onFilter: (value: string, record: Row) => record.class === value,
    },
    {
      title: "已入库",
      dataIndex: "store",
      width: 80,
      sorter: (a, b) => {
        const { store: a_s } = a;
        const { store: b_s } = b;
        if (a_s) {
          console.log(a_s);
        }

        // a_s = a_s || [];
      },
      render: renderContent,
    },
    {
      title: "想看",
      dataIndex: "tmp_store",
      width: 70,
      sorter: (a: number, b: number) =>
        a.zh_tw.length - b.zh_tw.length > 0 ? 1 : -1,
      render: renderContent,
    },
    {
      title: "日文",
      dataIndex: "jp",
      width: 100,
      render: renderContent,
    },
    {
      title: "英文",
      dataIndex: "en",
      width: 100,
      render: renderContent,
    },

    {
      title: "备注",
      dataIndex: "note",
      width: 180,
      render: renderContent,
    },
    {
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
    },
  ];

  const [wrap] = useWrap({
    el: document.querySelector(".semi-layout-content"),
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await window.app?.getTags({});
      // console.log(res);
      setData(res.data);
      setLoading(false);
    })();
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

  const search = async () => {
    let params = {
      [dimension]: searchWord,
    };
    setLoading(true);
    if (!params[dimension] || !dimension) params = {};
    const res = await window.app?.getTags(params);
    // console.log(res);
    setData(res.data);
    setLoading(false);
  };

  return (
    <>
      <div style={{ marginBottom: 10, display: "flex" }}>
        <h2 style={{ margin: "0 20px 0 0" }}>标签管理</h2>
        <InputGroup>
          <Select
            onChange={setDimension}
            value={dimension}
            style={{ width: "150px" }}
            placeholder="检索维度"
            showClear
            onClear={() => {
              setSearchWord("");
              search();
            }}
          >
            <Select.Option value="zh_tw">中文名</Select.Option>
            <Select.Option value="jp">日文名</Select.Option>
            <Select.Option value="en">英文名</Select.Option>
          </Select>
          <Input
            placeholder="请输入"
            style={{ width: 400 }}
            suffix={<IconSearch />}
            value={searchWord}
            onChange={setSearchWord}
            showClear
            onEnterPress={search}
          ></Input>
        </InputGroup>
      </div>
      <Table
        bordered
        rowKey={"id"}
        size="small"
        columns={columns}
        dataSource={dataSource}
        virtual
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
        // rowSelection={rowSelection}
        scroll={{ y: wrap.height - 140 }}
        pagination={false}
        loading={loading}
        // virtualized
        style={{ width: "100%", margin: "0 auto" }}
        onRow={handleRow}
        // resizable
      />
      <EditModal
        currentRow={currenRow}
        visible={editVisible}
        handleOk={async (params: Row) => {
          const res = await window.app.updateTag(params);
          return res?.success;
        }}
        afterOk={async () => {
          await search();
          Notification.success({
            title: "修改成功",
            position: "bottomRight",
            // content: "ies dance dance dance",
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
