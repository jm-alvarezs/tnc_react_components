import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Form from "react-bootstrap/Form";
import InfiniteCalendar from "react-infinite-calendar";

moment.locale(
  "es",
  "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dec".split("_")
);
moment.locale(
  "en",
  "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
);

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
  }

  componentDidMount() {
    if (this.props.value) this.setState({ value });
  }

  getDate(value) {
    return moment(value).format("DD MMM YYYY");
  }

  toJSDate(date) {
    if(date) return moment(date).toDate();
    return new Date();
  }

  setValue(value, name) {
      if(this.props.type === "date")
        value = this.getDate(value);
      this.setState({ value });
      this.handleModifier(value, name);
  }

  handleChange(evt) {
    const { target } = evt;
    const { value, name } = target;
    this.setValue(value, name);
  }

  handleModifier(value, name) {
    if (this.props.modifier) {
      if (this.props.args) {
        if (Array.isArray(this.props.args))
          this.props.modifier(...this.props.args, value, name);
        else this.props.modifier(this.props.args, value, name);
      } else {
        this.props.modifier(value, name);
      }
    }
  }

  renderOptions() {
    if (this.props.options)
      return this.props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ));
  }

  renderCalendar() {
    if (this.state.showCalendar)
      return (
        <InfiniteCalendar
          selected={this.toJSDate(this.state.value)}
          minDate={new Date(2000, 0, 1)}
          width={285}
          height={285}
          className="mt-2"
          locale={{
            blank: this.props.placeholder,
            headerFormat: "DD MMM 20YY",
            todayLabel: { long: "Hoy" },
            weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekStartsOn: 0
          }}
          theme={{
            selectionColor: "#FC6767",
            textColor: {
              default: "#333",
              active: "#FFF"
            },
            weekdayColor: "#fff",
            headerColor: "#FC6767",
            floatingNav: {
              background: "#FC6767",
              color: "#FFF",
              chevron: "#FFA726"
            }
          }}
          displayOptions={{
            showTodayHelper: false
          }}
          onSelect={this.setValue}
        />
      );
  }

  renderType() {
    if (this.props.type === "select")
      return <Form.Control>{this.renderOptions()}</Form.Control>;
    if (this.props.type === "date")
      return (
        <Fragment>
          {this.renderCalendar()}
          <Form.Control value={this.state.value} disabled={true} />
        </Fragment>
      );
  }

  render() {
    return (
      <Fragment>
        {this.renderLabel()}
        {this.renderType()}
      </Fragment>
    );
  }
}

Input.PropTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  modifier: PropTypes.func,
  args: PropTypes.string || PropTypes.array,
  type: PropTypes.string,
  options: PropTypes.array,
  as: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool
};

export default Input;
