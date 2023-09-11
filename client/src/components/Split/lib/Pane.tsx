import React from 'react';
import type { CSSProperties } from 'styled-components';

type Prop = {
  children: any;
  className: string;
  split: 'vertical' | 'horizontal';
  style: CSSProperties;
  eleRef: any;
  size: number;
};

class Pane extends React.PureComponent<Prop> {
  render() {
    const { children, className, split, style: styleProps, size, eleRef } = this.props;

    const classes = ['Pane', split, className];

    let style: CSSProperties = {
      flex: 1,
      position: 'relative',
      outline: 'none',
    };

    if (size !== undefined) {
      if (split === 'vertical') {
        style.width = size;
      } else {
        style.height = size;
        style.display = 'flex';
      }
      style.flex = 'none';
    }

    style = { ...style, ...(styleProps || {}) };

    return (
      <div ref={eleRef} className={classes.join(' ')} style={style}>
        {children}
      </div>
    );
  }
}

export default Pane;
