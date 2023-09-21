/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseTablePage from "@/blocks/BaseTablePage";
import ArtistCard from "./component/ArtistCard";
import { getAge } from "@/lib/calcDate";
import { Segmented, Space, Switch, Table, Typography } from "antd";
import { Progress, Input, Notification } from "@douyinfe/semi-ui";
// import { SheetComponent } from "@antv/s2-react";
import "@antv/s2-react/dist/style.min.css";
import { IconSearch } from "@douyinfe/semi-icons";
import { IllustrationNoResult } from "@douyinfe/semi-illustrations";

import useWrap from "@/hooks/useWrap";

const getComplete = (record: never) => {
  if (!record) return null;
  const dict = {
    name: 1 / 17,
    debut: 0.05,
    avatar: 1 / 17,
    cover: 1 / 10,
    description: 0.1,
    birth: 0.05,
    tall: 0.05,
    breast: 0.03,
    waist: 0.03,
    hip: 0.03,
    cup: 0.04,
    birth_place: 0.01,
    images: 0.12,
    tags: 0.08,
    nameJP: 0.1,
    name_EN: 0.02,
    name_CN: 0.02,
    rate: 0.05,
    isRetired: 0.02,
  };
  let ret = 1;
  Object.entries(dict).forEach(([key, val]) => {
    if (record[key] === null || record[key] === "") {
      ret -= val;
    }
  });
  ret = Math.round(1000 * ret) / 10;
  return ret;
};

const getStoreCount = (text: string | null) => {
  const cur = text?.replaceAll("\\", "").replaceAll('"', "");
  let count = 0;
  if (cur) {
    count = cur.split(",").length;
  }
  return count;
};

const RenderComplete = ({ percent }) => {
  const strokeArr = [
    { percent: 0, color: "red" },
    { percent: 20, color: "red" },
    { percent: 40, color: "orange-6" },
    { percent: 60, color: "var(--semi-color-warning)" },
    { percent: 80, color: "orange-6" },
  ];

  return (
    <Progress
      percent={percent}
      // stroke="var(--semi-color-warning)"
      stroke={strokeArr}
      showInfo={true}
      aria-label="disk usage"
    />
  );
};

function Page() {
  const columns = [
    {
      title: "艺名",
      dataIndex: "name",
      // width: "auto",
      width: 160,
      fixed: "left",
      // sort: true,
      // defaultSortOrder: "descend",
      sorter: (a, b) => (a.name - b.name > 0 ? 1 : -1),
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
      onFilter: (value: string, record) => {
        return value === "hasRate" ? !!record.rate : !record.rate;
      },
    },
    {
      title: "完整度",
      dataIndex: "complete",
      width: "auto",
      sorter: (a, b) => {
        return a.complete - b.complete;
      },
      render: (text, record, index) => (
        <RenderComplete percent={getComplete(record)} />
      ),
      // formatter: (_t: any, _r: any, sheet: { rowId: string | number }) => {
      //   const record = data[sheet.rowId];
      //   return getComplete(record);
      // },
    },
    {
      title: "中文名",
      dataIndex: "name_CN",
      width: "100px",
      ellipsis: true,
    },
    {
      title: "英文名",
      dataIndex: "name_EN",
      width: "100px",
      ellipsis: true,
    },
    {
      title: "出生",
      dataIndex: "birth",
      width: 150,
      render: (text) => {
        if (!text || text === "0000-00-00") {
          return "--";
        }
        return `${text}(${getAge(text)}岁)`;
      },
      sorter: (a, b) => {
        // console.log(a.birth, b.birth);
        return getAge(a.birth) - getAge(b.birth) > 0 ? 1 : -1;
      },
    },
    {
      title: "身高",
      dataIndex: "tall",
      width: "auto",
      render: (text: any) => (text ? `${text}cm` : "--"),
    },
    {
      title: "三围",
      dataIndex: "sanwei",
      render: (_text, record) =>
        `${record.breast || "--"}/${record.waist || "--"}/${
          record.hip || "--"
        }`,
    },
    {
      title: "已入库",
      dataIndex: "store",
      width: 80,
      render: getStoreCount,
      sorter: (a, b) =>
        getStoreCount(a.store) - getStoreCount(b.store) > 0 ? 1 : -1,
    },
    {
      title: "想看",
      dataIndex: "tmp_store",
      width: 80,
    },
    {
      title: "操作",
      dataIndex: "operate",
      width: "auto",
      fixed: "right",
      render: (node, record) => {
        // console.log(node);
        return (
          <a
            onClick={() => {
              setCurrentRow(record);
              setVisible(true);
            }}
          >
            查看
          </a>
        );
      },
    },
  ];
  const [wrap, setWrap] = useWrap({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [searchWord, setSearchWord] = useState("");

  const [data, setData] = useState<any[]>([]);

  const query = async () => {
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
  };

  useEffect(() => {
    if (!searchWord) {
      query();
    }
  }, [searchWord]);

  useEffect(() => {
    query();
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
