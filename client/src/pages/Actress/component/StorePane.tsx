/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tabs, TabPane, List, Empty } from "@douyinfe/semi-ui";
import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from "@douyinfe/semi-illustrations";

const CardEmpty = () => {
  const imgStyle = { width: 150, height: 150, marginTop: 60 };
  return (
    <Empty
      image={<IllustrationNoContent style={imgStyle} />}
      darkModeImage={<IllustrationNoContentDark style={imgStyle} />}
      title="空空如也"
      description={`快去搜索创建关于爱豆的作品集！`}
    />
  );
};

const arrayFormatter = (str: string | null) => {
  str = str ? str + "" : str;
  if (!str) {
    return [];
  } else {
    const arr = str.replaceAll("\\", "").replaceAll('"', "").split(",");
    return arr;
  }
};

const StorePane = ({ store }: { store: string }) => {
  const store_data = arrayFormatter(store);
  return (
    <Card
      bodyStyle={{
        height: 414,
        overflow: "hidden",
        margin: 0,
        padding: "10px 0px 0 10px",
      }}
    >
      <Tabs
        size="large"
        type="card"
        tabList={[
          { tab: "本地片单", itemKey: "store" },
          { tab: "库内片单", itemKey: "tmp_store" },
        ]}
      >
        <TabPane itemKey="store">
          <List
            emptyContent={<CardEmpty />}
            dataSource={store_data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
            style={{ overflow: "auto", height: 360 }}
          />
        </TabPane>
        <TabPane itemKey="tmp_store">
          <List
            size="small"
            emptyContent={<CardEmpty />}
            dataSource={[]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default StorePane;
