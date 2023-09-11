import { Spin } from "@douyinfe/semi-ui";
import { SpinProps } from "@douyinfe/semi-ui/lib/es/spin";
import styles from "./index.module.less";

export default function index(props: SpinProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.item}>
        <Spin size="large" {...props} />
      </div>
    </div>
  );
}
