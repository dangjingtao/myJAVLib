import BaseTablePage from "@/blocks/BaseTablePage";

export default function index() {
  const columns = [
    {
      title: "厂商名",
      dataIndex: "name",
      width: 180,
      resize: true,
    },
    {
      title: "厂商代码",
      dataIndex: "code",
      width: 70,
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
    <BaseTablePage title={"发行商管理"} tableName={"label"} columns={columns} />
  );
}
