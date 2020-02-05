import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
  }

  handleModifier(file) {
    if (this.props.modifier) {
      if (this.props.args) {
        if (Array.isArray(this.props.args))
          this.props.modifier(...this.props.args, file);
        else this.props.modifier(this.props.args, file);
      } else {
        this.props.modifier(file);
      }
    }
  }

  handleChange(file) {
    let reader = new FileReader();
    reader.onload = e => {
      let src = e.target.result;
      this.setState({ src, height: 180 });
    };
    reader.readAsDataURL(file);
    this.handleModifier(file);
  }

  renderImagen() {
    if (this.state.src)
      return <Image className="d-block mb-3" src={this.props.base_url + src} />;
  }

  render() {
    return (
      <Fragment>
        <div style={{ width: "100%" }}>{this.renderImagen()}</div>
        <div style={{ width: "100%" }}>
          <input
            type="file"
            onchange={this.handleChange}
            style={{ position: "absolute", zIndex: 10, width: 135 }}
          />
          <Button
            variant="outline-primary"
            size="sm"
            className="pt-2 pb-2"
            style={{ position: "absolute", zIndex: 1 }}
          >
            <FontAwesomeIcon icon="camera" className="mr-2" /> Subir Imagen
          </Button>
        </div>
      </Fragment>
    );
  }
}

ImageInput.PropTypes = {
  base_url: PropTypes.string,
  src: PropTypes.string,
  modifier: PropTypes.func,
  args: PropTypes.string || PropTypes.array,
  accept: PropTypes.string
};

export default ImageInput;
