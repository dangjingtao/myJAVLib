import React from "react";
import type { CSSProp } from "styled-components";
import { polyfill } from "react-lifecycles-compat";

import Pane from "./Pane";
import { RESIZER_DEFAULT_CLASSNAME } from "./Resizer";
import VisualLine from "./VisualLine";
import Resizer from "./Resizer";

function unFocus(document: any, window: any) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function getDefaultSize(
  defaultSize: number,
  minSize: number,
  maxSize: number,
  draggedSize: number | null
) {
  if (typeof draggedSize === "number") {
    const min = typeof minSize === "number" ? minSize : 0;
    const max =
      typeof maxSize === "number" && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

function removeNullChildren(children: any) {
  return React.Children.toArray(children).filter((c) => c);
}

// SplitPane.defaultProps = {
//   allowResize: true,
//   minSize: 50,
//   primary: 'first',
//   split: 'vertical',
//   paneClassName: '',
//   pane1ClassName: '',
//   pane2ClassName: '',
// };

type SplitPaneProps = {
  allowResize: true;
  children: any;
  className: string;
  primary: "first" | "second";
  minSize: string | number;
  maxSize: string | number;
  // eslint-disable-next-line react/no-unused-prop-types
  defaultSize: string | number;
  size: string | number;
  split: "vertical" | "horizontal";
  onDragStarted: any;
  onDragFinished: any;
  onChange: any;
  onResizerClick: any;
  onResizerDoubleClick: any;
  style: CSSProp;
  resizerStyle: CSSProp;
  paneClassName: string;
  pane1ClassName: string;
  pane2ClassName: string;
  paneStyle: CSSProp;
  pane1Style: CSSProp;
  pane2Style: CSSProp;
  resizerClassName: string;
  step: number;
  iToggleSize: boolean;
  toggleSize: any;
};

type SplitState = {
  active: boolean;
  resized: boolean;
  isClick: boolean;
  pane1Size: string | undefined;
  pane2Size: string | undefined;
  instanceProps: any;
  visualPosition: string | number;
  visualLineAllow: boolean;
  position: number | undefined;
  draggedSize: number | undefined;
};

class SplitPane extends React.Component<any, any> {
  splitPane: any;
  pane1: any;
  pane2: any;
  constructor(props: any) {
    super(props);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const { size, defaultSize, minSize, maxSize, primary } = props;

    const initialSize =
      size !== undefined
        ? size
        : getDefaultSize(defaultSize, minSize, maxSize, null);

    this.state = {
      allowResize: true,
      active: false,
      resized: false,
      isClick: true, // 区分拖拽和点击
      pane1Size: primary === "first" ? initialSize : undefined,
      pane2Size: primary === "second" ? initialSize : undefined,

      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size,
      },
      visualPosition: 0,
      visualLineAllow: false,
      position: undefined,
      draggedSize: undefined,
    };
  }
  resizerRef = React.createRef<HTMLDivElement>();
  deviation = 0;
  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("touchmove", this.onTouchMove);
    this.setState(SplitPane.getSizeUpdate(this.props, this.state));
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return SplitPane.getSizeUpdate(nextProps, prevState);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("touchmove", this.onTouchMove);
  }

  onMouseDown(event: any) {
    const eventWithTouches = {
      ...event,
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    };
    this.onTouchStart(eventWithTouches);
  }

  onTouchStart(event: any) {
    if (event.target.classList.contains("split-btn")) {
      event.preventDefault();
      return;
    }
    const { allowResize, onDragStarted, split } = this.props;
    if (allowResize) {
      unFocus(document, window);
      this.deviation =
        split === "vertical"
          ? event.touches[0].clientX -
            this.resizerRef.current!.getBoundingClientRect().x
          : event.touches[0].clientY -
            this.resizerRef.current!.getBoundingClientRect().y;
      const position =
        split === "vertical"
          ? event.touches[0].clientX - this.deviation
          : event.touches[0].clientY - this.deviation;

      if (typeof onDragStarted === "function") {
        onDragStarted();
      }

      const { splitPane } = this;
      let absDistance = 0;
      if (split === "vertical") {
        absDistance = splitPane.getBoundingClientRect().x;
      } else {
        absDistance = splitPane.getBoundingClientRect().y;
      }
      this.setState({
        isClick: true,
        active: true,
        position,
        visualLineAllow: false,
        visualPosition: position - absDistance,
      });
    }
  }

  onMouseMove(event: any) {
    const eventWithTouches = {
      ...event,
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
    };
    this.onTouchMove(eventWithTouches);
  }

  onTouchMove(event: any) {
    const { allowResize, maxSize, minSize, onChange, split, step, primary } =
      this.props;
    const { active } = this.state;
    if (allowResize && active) {
      unFocus(document, window);

      const { splitPane } = this;
      const current =
        split === "vertical"
          ? event.touches[0].clientX - this.deviation
          : event.touches[0].clientY - this.deviation;

      let first_absDistance = 0;
      if (split === "vertical") {
        first_absDistance = splitPane.getBoundingClientRect().x;
      } else {
        first_absDistance = splitPane.getBoundingClientRect().y;
      }

      let second_absDistance = 0;
      if (split === "vertical") {
        second_absDistance =
          splitPane.getBoundingClientRect().width -
          (current - splitPane.getBoundingClientRect().x);
      } else {
        second_absDistance =
          splitPane.getBoundingClientRect().height -
          (current - splitPane.getBoundingClientRect().y);
      }

      const newVisualPosition =
        primary === "first" ? current - first_absDistance : second_absDistance;

      const newSize =
        primary === "first"
          ? newVisualPosition
          : current -
            (split === "vertical"
              ? splitPane.getBoundingClientRect().x
              : splitPane.getBoundingClientRect().y);

      if (newVisualPosition > maxSize || newVisualPosition < minSize) {
        this.setState({
          isClick: false,
          visualLineAllow: false,
        });
      } else {
        this.setState({
          isClick: false,
          visualLineAllow: true,
          visualPosition: newSize,
        });
      }

      // if (onChange) onChange(newSize);
    }
  }

  onMouseUp(event: any) {
    const {
      allowResize,
      maxSize,
      minSize,
      onChange,
      split,
      step,
      onDragFinished,
    } = this.props;
    const { active, position, draggedSize } = this.state;

    // const { active, draggedSize } = this.state;

    if (allowResize && active) {
      unFocus(document, window);
      const isPrimaryFirst = this.props.primary === "first";
      const ref = isPrimaryFirst ? this.pane1 : this.pane2;
      const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
      if (ref) {
        const node = ref;
        const node2 = ref2;

        if (node.getBoundingClientRect) {
          const { width } = node.getBoundingClientRect();
          const { height } = node.getBoundingClientRect();
          // const current =
          //   split === 'vertical'
          //     ? event.touches[0].clientX
          //     : event.touches[0].clientY;
          const current =
            split === "vertical"
              ? event.clientX - this.deviation
              : event.clientY - this.deviation;
          const size = split === "vertical" ? width : height;
          let positionDelta = position - current;
          if (step) {
            if (Math.abs(positionDelta) < step) {
              return;
            }
            // Integer division
            // eslint-disable-next-line no-bitwise
            positionDelta = ~~(positionDelta / step) * step;
          }
          let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

          const pane1Order = parseInt(window.getComputedStyle(node).order, 10);
          const pane2Order = parseInt(window.getComputedStyle(node2).order, 10);
          if (pane1Order > pane2Order) {
            sizeDelta = -sizeDelta;
          }

          let newMaxSize = maxSize;
          if (maxSize !== undefined && maxSize <= 0) {
            const { splitPane } = this;
            if (split === "vertical") {
              newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
            } else {
              newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
            }
          }

          let newSize: number | string = size - sizeDelta;
          const newPosition = position - positionDelta;

          if (newSize < minSize) {
            newSize = minSize;
          } else if (maxSize !== undefined && newSize > newMaxSize) {
            newSize = newMaxSize;
          } else {
            this.setState({
              position: newPosition,
              resized: true,
            });
          }

          if (onChange) onChange(newSize);

          this.setState({
            draggedSize: newSize,
            [isPrimaryFirst ? "pane1Size" : "pane2Size"]: newSize,
          });
        }
      }
    }

    if (allowResize && active) {
      if (typeof onDragFinished === "function") {
        onDragFinished(draggedSize);
      }
      this.setState({ active: false, isClick: true });
    }
  }

  // we have to check values since gDSFP is called on every render and more in StrictMode
  static getSizeUpdate(props: any, state: any) {
    const newState: any = {};
    const { instanceProps } = state;

    if (instanceProps.size === props.size && props.size !== undefined) {
      return {};
    }

    const newSize =
      props.size !== undefined
        ? props.size
        : getDefaultSize(
            props.defaultSize,
            props.minSize,
            props.maxSize,
            state.draggedSize
          );

    if (props.size !== undefined) {
      newState.draggedSize = newSize;
    }

    const isPanel1Primary = props.primary === "first";

    newState[isPanel1Primary ? "pane1Size" : "pane2Size"] = newSize;
    newState[isPanel1Primary ? "pane2Size" : "pane1Size"] = undefined;

    newState.instanceProps = { size: props.size };

    return newState;
  }

  render() {
    const {
      allowResize,
      children,
      className,
      onResizerClick,
      onResizerDoubleClick,
      paneClassName,
      pane1ClassName,
      pane2ClassName,
      paneStyle,
      pane1Style: pane1StyleProps,
      pane2Style: pane2StyleProps,
      resizerClassName,
      resizerStyle,
      split,
      style: styleProps,
      //
      iToggleSize,
      toggleSize,
      primary,
    } = this.props;

    const { pane1Size, pane2Size } = this.state;

    const disabledClass = allowResize ? "" : "disabled";
    const resizerClassNamesIncludingDefault = resizerClassName
      ? `${resizerClassName} ${RESIZER_DEFAULT_CLASSNAME}`
      : resizerClassName;

    const notNullChildren = removeNullChildren(children);

    const style: CSSProp = {
      display: "flex",
      flex: 1,
      height: "100%",
      position: "absolute",
      outline: "none",
      overflow: "hidden",
      MozUserSelect: "text",
      WebkitUserSelect: "text",
      msUserSelect: "text",
      userSelect: "text",
      ...styleProps,
    };

    if (split === "vertical") {
      Object.assign(style, {
        flexDirection: "row",
        left: 0,
        right: 0,
      });
    } else {
      Object.assign(style, {
        bottom: 0,
        flexDirection: "column",
        minHeight: "100%",
        top: 0,
        width: "100%",
      });
    }

    const classes = ["SplitPane", className, split, disabledClass];

    const pane1Style = { ...paneStyle, ...pane1StyleProps };
    const pane2Style = { ...paneStyle, ...pane2StyleProps };

    const pane1Classes = ["Pane1", paneClassName, pane1ClassName].join(" ");
    const pane2Classes = ["Pane2", paneClassName, pane2ClassName].join(" ");
    return (
      <div
        className={classes.join(" ")}
        ref={(node) => {
          this.splitPane = node;
        }}
        style={style}
      >
        <Pane
          className={pane1Classes}
          key="pane1"
          eleRef={(node: any) => {
            this.pane1 = node;
          }}
          size={pane1Size}
          split={split}
          style={pane1Style}
        >
          {notNullChildren[0]}
        </Pane>
        <VisualLine
          visualPosition={this.state.visualPosition}
          isShow={this.state.active}
          allow={this.state.visualLineAllow}
          split={split}
          primary={primary}
          style={resizerStyle || {}}
          iToggleSize={iToggleSize}
        />
        <Resizer
          className={disabledClass}
          onClick={onResizerClick}
          onDoubleClick={onResizerDoubleClick}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onMouseUp}
          key="resizer"
          resizerClassName={resizerClassNamesIncludingDefault}
          split={split}
          style={resizerStyle || {}}
          iToggleSize={iToggleSize}
          toggleSize={toggleSize}
          primary={primary}
          isClick={this.state.isClick}
          resizerRef={this.resizerRef}
        />
        <Pane
          className={pane2Classes}
          key="pane2"
          eleRef={(node: any) => {
            this.pane2 = node;
          }}
          size={pane2Size}
          split={split}
          style={pane2Style}
        >
          {notNullChildren[1]}
        </Pane>
      </div>
    );
  }
}

// SplitPane.defaultProps = {
//   allowResize: true,
//   minSize: 50,
//   primary: 'first',
//   split: 'vertical',
//   paneClassName: '',
//   pane1ClassName: '',
//   pane2ClassName: '',
// };

polyfill(SplitPane);

export default SplitPane;
