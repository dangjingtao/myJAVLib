/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tabs, TabPane, List, Empty } from "@douyinfe/semi-ui";

import {
  IllustrationNoContent,
  IllustrationNoContentDark,
} from "@douyinfe/semi-illustrations";

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
      // cover={<AnimationCloud data={showTag} />}
      // bodyStyle={{ display: "none" }}
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
          { tab: "本地片单", itemKey: "1" },
          { tab: "库内片单", itemKey: "2" },
        ]}
      >
        <TabPane itemKey="1">
          <List
            emptyContent={
              <Empty
                image={
                  <IllustrationNoContent
                    style={{ width: 150, height: 150, marginTop: 60 }}
                  />
                }
                darkModeImage={
                  <IllustrationNoContentDark
                    style={{ width: 150, height: 150, marginTop: 60 }}
                  />
                }
                title="空空如也"
                description={`快去搜索创建关于爱豆的作品集！`}
              ></Empty>
            }
            dataSource={store_data}
            renderItem={(item) => <List.Item>{item}</List.Item>}
            style={{ overflow: "auto", height: 360 }}
          />
        </TabPane>
        <TabPane itemKey="2">
          <List
            size="small"
            emptyContent={
              <Empty
                image={
                  <IllustrationNoContent
                    style={{ width: 150, height: 150, marginTop: 60 }}
                  />
                }
                darkModeImage={
                  <IllustrationNoContentDark
                    style={{ width: 150, height: 150 }}
                  />
                }
                title="空状态标题"
                description="开始创建你的第一个仪表盘吧！"
              ></Empty>
            }
            dataSource={[]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default StorePane;
