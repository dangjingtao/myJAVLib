import classNames from "classnames";
import {
  IconClose,
  IconMinusCircle,
  IconPlusCircle,
  IconClear,
} from "@douyinfe/semi-icons";
import styles from "./styles.module.less";

export default function index({ type }: { type: "login" | "common" }) {
  const quit = () => window.app?.quit();
  return (
    <div className={type === "login" ? styles.loginWrap : styles.wrap}>
      <div className={type === "login" ? "" : styles.innerWrap}>
        {type === "login" ? (
          <>
            <a
              className={classNames(styles.closeBtn, styles.noDrag)}
              onClick={quit}
            >
              <IconClose />
            </a>
          </>
        ) : (
          <>
            <a
              className={classNames(styles.closeBtnCircle, styles.noDrag)}
              onClick={quit}
            >
              <IconClear />
            </a>
            <a
              className={classNames(styles.maxBtn, styles.noDrag)}
              onClick={() => window.app?.winToggleSize()}
            >
              <IconPlusCircle />
            </a>
            <a
              className={classNames(styles.minBtn, styles.noDrag)}
              onClick={() => window.app.winMin()}
            >
              <IconMinusCircle />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
