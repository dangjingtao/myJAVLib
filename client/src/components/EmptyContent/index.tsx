import { Empty } from "@douyinfe/semi-ui";
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from "@douyinfe/semi-illustrations";

const EmptyContent = ({ style }: { style?: object }) => {
  return (
    <Empty
      style={{ margin: "200px 200px 0", ...style }}
      image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
      darkModeImage={
        <IllustrationConstructionDark style={{ width: 150, height: 150 }} />
      }
      title={"🐻快来搜一搜吧"}
      description="当前功能只支持骑兵"
    />
  );
};

export default EmptyContent;
