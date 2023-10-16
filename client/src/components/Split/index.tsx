import { useState } from "react";
import OSplitPane from "./lib/SplitPane";
import Pane from "./lib/Pane";
import type { SplitProps } from "./interface";

const resizerStyle = {
  position: "relative",
  opacity: 1,
  zIndex: 1,
  boxSizing: "border-box",
  backgroundClip: "padding-box",
};

export const SplitPane = (props: SplitProps) => {
  const { minSize, maxSize, ...rest } = props;
  const defaultSize = { minSize, maxSize };
  const [iToggleSize, setITotoggleSize] = useState(false);

  const toggleSize = () => {
    setITotoggleSize(!iToggleSize);
  };

  const getSize = () => {
    return iToggleSize
      ? {
          minSize: 0,
          maxSize: 0,
        }
      : defaultSize;
  };

  const { minSize: min, maxSize: max } = getSize();
  return (
    <>
      <OSplitPane
        allowResize={true}
        primary={"first"}
        split={"vertical"}
        {...rest}
        minSize={min}
        maxSize={max}
        toggleSize={() => {
          rest.onToggleClick && rest.onToggleClick(!iToggleSize);
          toggleSize();
        }}
        iToggleSize={iToggleSize}
        resizerStyle={resizerStyle}
      />
    </>
  );
};

export default { Pane, SplitPane };
