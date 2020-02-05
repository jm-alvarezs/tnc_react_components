import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const DroppedImage = props => (
  <Card style={{ backgroundColor: "transparent", border: 0 }} className="mb-4">
    <Image
      src={props.base_url + props.src}
      className="w-100 mr-3"
      style={{ maxWidth: 150 }}
    />
    <Button
      variant="outline-danger"
      style={{ position: "absolute", top: -15, right: 10 }}
      onClick={() => props.removeImage(props.src)}
    >
      <i className="fa fa-trash" />
    </Button>
  </Card>
);

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
  }

  componentDidMount() {
    this.setDropZone();
  }

  setDropZone() {
    let area = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      area.addEventListener(eventName, this.preventDefaults, false);
    });
    area.addEventListener("drop", this.handleDrop, false);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    let files = e.dataTransfer.files;
    this.handleFiles(files);
  }

  handleSelect(e) {
    this.handleFiles(e.target.files);
  }

  handleFiles(files) {
    if (files)
      for (let i = 0; i < files.length; i++) this.handleModifier(files[i]);
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

  renderImages() {
    if (this.props.images)
      return this.props.images.map(image => (
        <DroppedImage
          key={image.src}
          src={image.src}
          removeImage={this.props.reomveImage}
        />
      ));
  }

  render() {
    return (
      <Fragment>
        <div style={{ width: "100%", height: 150 }}>{this.renderImages()}</div>
        <div
          id="drop-area"
          style={{ height: 150, width: "100%" }}
          className="bg-light border text-center pt-5"
        >
          <label className="d-block text-center m-auto">
            {this.props.placeholder}
          </label>
          <input
            className="d-block text-center m-auto"
            type="file"
            multiple
            accept="image/*"
            onChange={this.handleSelect}
          />
        </div>
      </Fragment>
    );
  }
}

Dropzone.PropTypes = {
  images: PropTypes.array,
  removeImage: PropTypes.func,
  placeholder: PropTypes.string,
  modifier: PropTypes.func,
  args: PropTypes.array || PropTypes.string
};

export default Dropzone;
