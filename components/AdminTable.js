import PropTypes from "prop-types";
import React, { Component } from "react";

class AdminTable extends Component {
  render() {}
}

AdminTable.PropTypes = {
  idRow: PropTypes.string,
  rows: PropTypes.array,
  headers: PropTypes.arrayOf(PropTypes.string),
  exclude: PropTypes.arrayOf(PropTypes.string),
  displayId: PropTypes.bool,
  editedRow: PropTypes.object,
  options: PropTypes.object,
  inputTypes: PropTypes.object,
  inputModifider: PropTypes.func,
  reducer: PropTypes.string,
  schema: PropTypes.object,
  components: PropTypes.object,
  editRow: PropTypes.func,
  saveRow: PropTypes.func,
  deleteRow: PropTypes.func,
  actions: PropTypes.objectOf(
    PropTypes.objectOf({
      name: PropTypes.string,
      action: PropTypes.func,
      icon: PropTypes.string
    })
  )
};

export default AdminTable;
