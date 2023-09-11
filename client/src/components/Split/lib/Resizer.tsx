import React, { useContext } from 'react';
import './index.less';

export const RESIZER_DEFAULT_CLASSNAME = 'QuarkResizer';
type Prop = {
  className: string;
  onClick: any;
  onDoubleClick: any;
  onMouseDown: any;
  onTouchEnd: any;
  onTouchStart: any;
  resizerClassName: any;
  split: 'vertical' | 'horizontal';
  style: any;
  toggleSize: any;
  iToggleSize: boolean;
  primary: 'first' | 'second';
  isClick: boolean;
  resizerRef: React.RefObject<HTMLDivElement>;
};

const Resizer = (props: Prop) => {
  const {
    className,
    // onClick,
    onDoubleClick,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    resizerClassName,
    split,
    style,
    toggleSize,
    isClick,
    resizerRef,
  } = props;
  const classes = [resizerClassName, split, className];

  const extraStyle =
    split === 'vertical'
      ? {
          display: 'inline-block',
          width: '8px',
          backgroundColor: '#f1f1f1',
          borderLeft: '1px solid #e2e2e2',
          borderRight: '1px solid #e2e2e2',
          cursor: 'col-resize',
        }
      : {
          display: 'inline-block',
          height: '8px',
          backgroundColor: '#f1f1f1',
          borderTop: '1px solid #e2e2e2',
          borderBottom: '1px solid #e2e2e2',
          cursor: 'row-resize',
        };

  const splitBtnStyle =
    split === 'vertical'
      ? {
          margin: 0,
          height: '100%',
          verticalAlign: 'middle',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9,
          fontSize: '10px',
          color: '#000',
        }
      : {
          margin: 0,
          // position: 'absolute',
          // top: 0,
          // bottom: 0,
          height: '10px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9,
          backgroundColor: 'rgb(241,241,241)',
          fontSize: '10px',
          color: '#000',
        };

  return (
    <span
      role="presentation"
      className={classes.join(' ')}
      style={{
        ...style,
        ...extraStyle,
        ...splitBtnStyle,
      }}
      ref={resizerRef}
      onMouseDown={(event) => onMouseDown(event)}
      onTouchStart={(event) => {
        event.preventDefault();
        onTouchStart(event);
      }}
      onTouchEnd={(event) => {
        event.preventDefault();
        onTouchEnd(event);
      }}
      onDoubleClick={(event) => {
        if (onDoubleClick) {
          event.preventDefault();
          onDoubleClick(event);
        }
        // if (isClick) {
        //   event.preventDefault();
        //   toggleSize();
        // }
      }}
      onClick={(e) => {
        if (isClick) {
          e.preventDefault();
          toggleSize();
        }
      }}
    >
      {split === 'vertical' ? (
        <div
          onClick={(event: any) => {
            if (isClick) {
              event.preventDefault();
              toggleSize();
            }
          }}
          className={`barLine`}
        />
      ) : (
        <div
          onClick={(event: any) => {
            if (isClick) {
              event.preventDefault();
              toggleSize();
            }
          }}
          className={`$barLine2`}
        />
      )}
    </span>
  );
};

export default Resizer;
