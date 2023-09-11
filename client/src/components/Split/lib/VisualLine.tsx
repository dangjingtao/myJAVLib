/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import type { CSSProperties } from 'styled-components';

import './index.less';

export default (props: {
  visualPosition: any;
  isShow: any;
  allow: any;
  split: any;
  style: any;
  primary: any;
  iToggleSize: any;
}) => {
  const { visualPosition, isShow, allow, split, style } = props;
  const width = split === 'vertical' ? '8px' : '100%';
  const left = split === 'vertical' ? visualPosition : 0;
  const right = split === 'vertical' ? undefined : 0;
  const top = split === 'vertical' ? 0 : visualPosition;
  const bottom = split === 'vertical' ? 0 : undefined;

  const cursor = split === 'vertical' ? 'col-resize' : 'row-resize';

  const extraStyle =
    split === 'vertical'
      ? {
          display: 'inline-block',
          width: '8px',
          backgroundColor: '#f1f1f1',
          borderLeft: '1px solid #e1eeff',
          borderRight: '1px solid #d3e4ff',
          cursor: 'col-resize',
        }
      : {
          display: 'inline-block',
          height: '8px',
          backgroundColor: '#e1eeff',
          borderTop: '1px solid #d3e4ff',
          borderBottom: '1px solid #d3e4ff',
          cursor: 'row-resize',
        };

  const splitBtnStyle: CSSProperties =
    split === 'vertical'
      ? {
          width: '100%',
          margin: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9,
          backgroundColor: '#e1eeff',
          fontSize: '7px',
          color: '#000',
          cursor: 'row-resize',
        }
      : {
          margin: 0,
          position: 'absolute',
          top: 0,
          bottom: 0,
          height: '7px',
          width: '100%',
          left: 0,
          right: 0,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9,
          backgroundColor: '#e1eeff',
          color: '#000',
          fontSize: '10px',
        };

  return (
    <span
      role="presentation"
      style={{
        ...style,
        ...extraStyle,
        position: 'absolute',
        top,
        bottom,
        left,
        right,
        width,
        // border: border,
        pointerEvents: 'none',
        zIndex: 99999999,
        display: isShow ? 'block' : 'none',
        cursor,
        // opacity
      }}
    >
      <a style={splitBtnStyle}>
        {split === 'vertical' ? <div className={`barLine`} /> : <div className={`barLine2`} />}
      </a>
    </span>
  );
};
