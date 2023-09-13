import BaseTablePage from "@/blocks/BaseTablePage";
import ArtistCard from "./component/ArtistCard";

function mymethod(birthday) {
  if (birthday) {
    var str = birthday;
    birthday = birthday.split("-");
    // 新建日期对象
    let date = new Date();
    // 今天日期，数组，同 birthday
    let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    // 分别计算年月日差值
    let age = today.map((val, index) => {
      return val - birthday[index];
    });
    // 当天数为负数时，月减 1，天数加本月总天数
    if (age[2] < 0) {
      // 获取当月总天数的方法
      let curMonth = new Date(today[0], today[1], 0);
      age[1]--;
      age[2] += curMonth.getDate();
    }
    // 当月数为负数时，年减 1，月数加上 12
    if (age[1] < 0) {
      age[0]--;
      age[1] += 12;
    }
    // console.log("出生日期：" + str + "  岁数：" + age[0] + "岁");
    return age[0];
  }
}

export default function index() {
  const columns = [
    {
      title: "艺名",
      dataIndex: "name",
      width: 120,
      resize: true,
    },
    {
      title: "中文名",
      dataIndex: "name_CN",
      width: 70,
    },
    {
      title: "英文名",
      dataIndex: "name_EN",
      width: 70,
    },
    {
      title: "本地评分",
      dataIndex: "my_rate",
      width: 120,
      sorter: (a: number, b: number) => (a - b > 0 ? 1 : -1),
    },
    {
      title: "出生",
      dataIndex: "birth",
      width: 180,
      render: (text) => {
        if (!text || text === "0000-00-00") {
          return "--";
        }
        return `${text}(${mymethod(text)}岁)`;
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

    {
      title: "备注",
      dataIndex: "note",
      width: 180,
    },
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
