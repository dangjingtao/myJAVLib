import {
  Table,
  Avatar,
  Button,
  Empty,
  Typography,
  Tooltip,
  InputGroup,
  Input,
  InputNumber,
  AutoComplete,
  DatePicker,
  Modal,
  Select,
  Descriptions,
} from "@douyinfe/semi-ui";
import { IconDelete, IconSearch } from "@douyinfe/semi-icons";
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
const { Text } = Typography;

const renderContent = (text, record, index) => {
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
const dict = {
  censored: "有码",
  uncensored: "无码",
};
const showModal = ({ title = "详情", content = {} }) => {
  const data = [
    { key: "识别码", value: content.code },
    { key: "日文", value: content.jp },
    { key: "中文", value: content.zh_tw },
    { key: "英文", value: content.en },
    { key: "所属大类", value: dict[content.classType] },
    { key: "类别", value: content.class },
    { key: "标记", value: <textarea value={content.note}></textarea> },
  ];

  Modal.info({
    title,
    content: (
      <>
        <Descriptions data={data} />
      </>
    ),
    style: { width: 800, height: 600 },
    zIndex: 96,
    centered: true,
  });
};

const columns = [
  {
    title: "中文",
    dataIndex: "zh_tw",
    width: 180,
    resize: true,
    sorter: (a, b) => (a.zh_tw.length - b.zh_tw.length > 0 ? 1 : -1),
    // fixed: true,
    // ellipsis: true,
    render: renderContent,
    // onFilter: (value, record) => record.name.includes(value),
  },
  {
    title: "类别",
    dataIndex: "classType",
    width: 100,
    filters: [
      {
        text: "有码",
        value: "Semi Design 设计稿",
      },
      {
        text: "无码",
        value: "Semi D2C 设计稿",
      },
    ],
    // sorter: (a, b) => (a.size - b.size > 0 ? 1 : -1),
    render: (text) => {
      const dict = {
        censored: "有码",
        uncensored: "无码",
      };
      return dict[text];
    },
  },

  {
    title: "二级分类",
    dataIndex: "class",
    width: 120,
    filters: [
      {
        text: "有码",
        value: "Semi Design 设计稿",
      },
      {
        text: "无码",
        value: "Semi D2C 设计稿",
      },
    ],
  },
  {
    title: "已入库",
    dataIndex: "movies",
    width: 100,
    sorter: (a, b) => (a.zh_tw.length - b.zh_tw.length > 0 ? 1 : -1),
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
    render: renderContent,
    // sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    // render: (value) => {
    //   return dateFns.format(new Date(value), "yyyy-MM-dd");
    // },
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: 200,
    render: (text, content) => {
      return (
        <Text
          style={{ cursor: "pointer", color: "var(--semi-color-link-visited)" }}
          link=""
          onClick={() => showModal({ content })}
        >
          详情
        </Text>
      );
    },
    // sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    // render: (value) => {
    //   return dateFns.format(new Date(value), "yyyy-MM-dd");
    // },
  },
];

function App() {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [scrollProp, setScrollProp] = useState({ y: 600, x: "100%" });

  useEffect(() => {
    const onResize = () => {
      const h = document.querySelector(".semi-layout-content")?.offsetHeight;
      const w = document.querySelector(".semi-layout-content")?.offsetWidth;
      if (h) {
        setScrollProp({ y: h - 140, x: w - 40 });
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Michael James", // Column configuration not to be checked
        name: record.name,
      }),
    }),
    []
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await window.app?.getTags({});
      console.log(res);
      setData(res.data);
      setLoading(false);
    })();
  }, []);

  const handleRow = (record, index) => {
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
        <h2 style={{ margin: "0 20px 0 0" }}>标签管理</h2>
        <InputGroup>
          <Select style={{ width: "150px" }} placeholder="检索维度">
            <Select.Option value="zh_tw">中文名</Select.Option>
            <Select.Option value="jp">日文名</Select.Option>
            <Select.Option value="en">英文名</Select.Option>
          </Select>
          <Input
            placeholder="请输入"
            style={{ width: 400 }}
            suffix={<IconSearch />}
            showClear
          ></Input>
        </InputGroup>
      </div>
      <Table
        bordered
        rowKey={"id"}
        size="small"
        columns={columns}
        dataSource={dataSource}
        // rowSelection={rowSelection}
        scroll={{ y: scrollProp.y }}
        pagination={false}
        loading={loading}
        virtualized
        style={{ width: "100%", margin: "0 auto" }}
        onRow={handleRow}
        resizable
      />
    </>
  );
}

export default App;
