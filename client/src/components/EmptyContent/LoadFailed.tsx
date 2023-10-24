import { Empty } from "@douyinfe/semi-ui";
import { IllustrationFailure } from "@douyinfe/semi-illustrations";
/* 以下为 1.13.0 版本后提供 */
import { IllustrationFailureDark } from "@douyinfe/semi-illustrations";
const LoadFailed = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => (
  <Empty
    image={<IllustrationFailure style={{ width: 150, height: 150 }} />}
    darkModeImage={
      <IllustrationFailureDark style={{ width: 150, height: 150 }} />
    }
    title={title}
    description={description}
    //   style={emptyStyle}
  />
);

export default LoadFailed;
