import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AdminView extends Component {
  renderButton() {
    if (this.props.buttonTitle)
      return (
        <Button className={this.props.className} onClick={this.props.onClick}>
          {this.props.icon && <FontAwesomeIcon icon={this.props.icon} />}
          {this.props.buttonTitle}
        </Button>
      );
  }

  render() {
    <Container fluid={true}>
      <Row>
        <Col xs={6} sm={8} lg={10}>
          <h1>{this.props.title}</h1>
        </Col>
        <Col xs={6} sm={4} lg={2}>
          {this.renderButton()}
        </Col>
      </Row>
      <Row>
        <Container fluid={true}>{this.props.children}</Container>
      </Row>
    </Container>;
  }
}

AdminView.PropTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string
};

export default AdminView;
