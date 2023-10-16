/* eslint-disable @typescript-eslint/no-explicit-any */

import ArtistCard from "./component/ArtistCard";
import { getAge, getComplete, getStoreCount } from "@/lib/artist";
import { Table } from "antd";
import { Input, Notification } from "@douyinfe/semi-ui";
import type { Record } from "@/types/artist";
import "@antv/s2-react/dist/style.min.css";
import { IconSearch } from "@douyinfe/semi-icons";
import useWrap from "@/hooks/useWrap";
import RenderComplete from "./component/RenderComplete";
const CommonRender = ({ content }: { content?: string }) => (
  <div>{content || "--"}</div>
);
function Page() {
  const columns = [
    {
      title: "艺名",
      dataIndex: "name",
      width: 160,
      fixed: "left",
      sorter: (a: Record, b: Record) => (a?.name - b?.name > 0 ? 1 : -1),
    },
    {
      title: "评分",
      dataIndex: "rate",
      width: 80,
      filters: [
        {
          text: "有评分",
          value: "hasRate",
        },
        {
          text: "无评分",
          value: "noRate",
        },
      ],
      onFilter: (value: string, record: Record) => {
        return value === "hasRate" ? !!record.rate : !record.rate;
      },
      sorter: (a: Record, b: Record) =>
        Number(a?.rate || 0) - Number(b?.rate || 0) > 0 ? 1 : -1,
      render: (t?: string | number) => t || "--",
    },
    {
      title: "完整度",
      dataIndex: "complete",
      width: "auto",
      sorter: (a: Record, b: Record) => {
        return a.complete - b.complete;
      },
      render: (_text: any, record: Record) => (
        <RenderComplete percent={getComplete(record)} />
      ),
    },
    {
      title: "中文名",
      dataIndex: "name_CN",
      width: "100px",
      ellipsis: true,
      render: (t?: string) => <CommonRender content={t} />,
    },
    {
      title: "英文名",
      dataIndex: "name_EN",
      width: "100px",
      ellipsis: true,
      render: (t?: string) => <CommonRender content={t} />,
    },
    {
      title: "出生",
      dataIndex: "birth",
      width: 150,
      render: (text?: string) => {
        if (!text || text === "0000-00-00") {
          return "--";
        }
        return `${text} (${getAge(text)}岁)`;
      },
      sorter: (a: Record, b: Record) => {
        return getAge(a.birth) - getAge(b.birth) > 0 ? 1 : -1;
      },
      filters: [
        {
          text: "有资料",
          value: "hasInfo",
        },
        {
          text: "无资料",
          value: "noInfo",
        },
      ],
      onFilter: (value: string, record: Record) => {
        return value === "hasInfo"
          ? getAge(record.birth) > -1
          : getAge(record.birth) === -1;
      },
    },
    {
      title: "身高",
      dataIndex: "tall",
      width: "auto",
      render: (text: any) => (text ? `${text}cm` : "--"),
      filters: [
        {
          text: "有资料",
          value: "hasInfo",
        },
        {
          text: "无资料",
          value: "noInfo",
        },
      ],
      onFilter: (value: string, record: Record) => {
        return value === "hasInfo" ? !!record?.tall : !record?.tall;
      },
      sorter: (a: Record, b: Record) => {
        return (a?.tall || 0) - (b?.tall || 0) > 0 ? 1 : -1;
      },
    },
    {
      title: "三围",
      dataIndex: "sanwei",
      width: 140,
      render: (_text: undefined, record: Record) =>
        `${record.breast || "--"}/${record.waist || "--"}/${
          record.hip || "--"
        }${record?.cup ? `（${record.cup}杯）` : ""}`,
    },
    {
      title: "已入库",
      dataIndex: "store",
      width: 80,
      render: getStoreCount,
      sorter: (a: Record, b: Record) =>
        getStoreCount(a.store) - getStoreCount(b.store) > 0 ? 1 : -1,
    },
    // {
    //   title: "想看",
    //   dataIndex: "tmp_store",
    //   width: 80,
    // },
    {
      title: "操作",
      dataIndex: "operate",
      width: "auto",
      fixed: "right",
      render: (_node: undefined, record: Record) => {
        return <a onClick={() => openDetail(record)}>查看</a>;
      },
    },
  ];
  const [wrap] = useWrap({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState<Record>({});
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState<any[]>([]);

  const openDetail = (record: Record) => {
    setCurrentRow(record);
    setVisible(true);
  };

  const query = useCallback(async () => {
    setLoading(true);
    const records =
      (
        await window.app?.getBaseDataByTableName({
          tableName: "actor",
          params: {},
          orLike: {
            word: searchWord,
            columns: ["name_JP", "name_EN", "name_CN"],
          },
        })
      )?.data || [];
    records.forEach((x) => {
      x.complete = getComplete(x);
    });
    // console.log(getComplete(records[0]));
    setData(records);
    setLoading(false);
  }, [searchWord]);

  useEffect(() => {
    if (!searchWord) {
      query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ marginBottom: 10, display: "flex" }}>
        <h2 style={{ margin: "0 20px 0 0" }}>艺术家管理</h2>
        <Input
          placeholder="模糊查询"
          style={{ width: 400 }}
          suffix={<IconSearch />}
          value={searchWord}
          onChange={setSearchWord}
          onEnterPress={query}
        ></Input>
      </div>
      <Table
        loading={loading}
        size={"small"}
        bordered={true}
        virtual
        columns={columns}
        scroll={{
          x: wrap.width - 200,
          y: wrap.height - 140,
        }}
        rowKey="id"
        dataSource={data}
        pagination={false}
      />
      <ArtistCard
        currentRow={currentRow}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        handleOk={async (params: Row) => {
          const res = await window.app.updateBaseDataByTableName({
            tableName: "actor",
            params,
          });
          console.log(params, res);
          return res?.success;
        }}
        afterOk={async () => {
          await query();
          Notification.success({
            title: "修改成功",
            position: "bottomRight",
            duration: 3,
          });
        }}
      />
    </>
  );
}

export default Page;
