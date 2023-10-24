import { Empty } from "@douyinfe/semi-ui";
import { IllustrationNotFound } from "@douyinfe/semi-illustrations";
/* 以下为 1.13.0 版本后提供 */
import { IllustrationNotFoundDark } from "@douyinfe/semi-illustrations";
const emptyStyle = {
  padding: 30,
};
const NotFound = () => (
  <Empty
    image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
    darkModeImage={
      <IllustrationNotFoundDark style={{ width: 150, height: 150 }} />
    }
    // title={"404"}
    title="Page Not Found"
    style={emptyStyle}
  />
);

export default NotFound;
