import BaseTablePage from "@/blocks/BaseTablePage";
import ArtistCard from "./component/ArtistCard";
import { getAge } from "@/lib/calcDate";
import { Progress } from "@douyinfe/semi-ui";

const getComplete = (record) => {
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

export default function index() {
  const columns = [
    {
      title: "艺名",
      dataIndex: "name",
      width: 120,
      resize: true,
    },
    {
      title: "评分",
      dataIndex: "rate",
      width: 60,
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    {
      title: "完整度",
      dataIndex: "complete",
      width: 150,
      render: (_text: undefined, record) => (
        <RenderComplete percent={getComplete(record)} />
      ),
      sorter: (a, b) => (getComplete(a) - getComplete(b) > 0 ? 1 : -1),
    },
    {
      title: "中文名",
      dataIndex: "name_CN",
      width: 70,
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },

    // {
    //   title: "英文名",
    //   dataIndex: "name_EN",
    //   width: 70,
    // },

    {
      title: "出生",
      dataIndex: "birth",
      width: 120,
      render: (text) => {
        if (!text || text === "0000-00-00") {
          return "--";
        }
        return `${text}(${getAge(text)}岁)`;
      },
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    {
      title: "身高",
      dataIndex: "tall",
      width: 90,
      render: (text) => (text ? `${text}cm` : "--"),
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    {
      title: "三围",
      dataIndex: "sanwei",
      width: 90,
      render: (_text, record) =>
        `${record.breast || "--"}/${record.waist || "--"}/${
          record.hip || "--"
        }`,
    },

    {
      title: "已入库",
      dataIndex: "store",
      width: 80,
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    {
      title: "想看",
      dataIndex: "tmp_store",
      width: 70,
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    // {
    //   title: "备注",
    //   dataIndex: "note",
    //   width: 180,
    // },
  ];
  return (
    <BaseTablePage
      EditModal={ArtistCard}
      title={"艺术家管理"}
      tableName={"actor"}
      columns={columns}
    />
  );
}
