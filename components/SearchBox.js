import React, { Component, Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Input from "./Input";
import PropTypes from "prop-types";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: ""
    };
    this.search = this.search.bind(this);
  }

  search(query) {
    if (this.props.searchModifier)
      this.props.searchModifier(query, this.state.property);
  }

  componentDidMount() {
    if (this.props.filters) this.setProperty();
  }

  setProperty(property) {
    this.setState({ property });
  }

  renderFilters() {
    if (this.props.filters) {
      return (
        <Fragment>
          <Col xs={12} sm={8} md={9} className="pr-0">
            <Input type="text" placeholder={this.props.placeholder} modifier={this.search} />
          </Col>
          <Col xs={12} sm={4} md={3}>
            <Input
              as="select"
              modifier={this.setProperty}
              options={this.props.options}
            />
          </Col>
        </Fragment>
      );
    }
    return (
      <Col>
        <Input
          type="text"
          placeholder={this.props.placeholder}
          modifier={this.search}
        />
      </Col>
    );
  }

  render() {
    return <Row className="mb-3">{this.renderFilters()}</Row>;
  }
}

SearchBox.PropTypes = {
    placeholder: PropTypes.string,
    searchModifier: PropTypes.func
}

export default SearchBox;
