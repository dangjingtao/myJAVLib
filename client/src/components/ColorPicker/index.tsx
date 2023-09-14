import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class SketchColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
    };
  }

  hexToRgba(hex) {
    return {
      r: parseInt("0x" + hex.slice(1, 3)),
      g: parseInt("0x" + hex.slice(3, 5)),
      b: parseInt("0x" + hex.slice(5, 7)),
      a: "1",
    };
  }
  // rgbaTohex(color) {
  //     return '#'+Number(color.r).toString(16)+Number(color.g).toString(16)+Number(color.b).toString(16);
  // }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.setToolColor(color.hex);
    console.log(123);
  };

  render() {
    const { toolColor } = this.props;
    let colorData = this.hexToRgba(toolColor);

    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, ${colorData.a})`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={colorData} onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default React.memo(SketchColor);
