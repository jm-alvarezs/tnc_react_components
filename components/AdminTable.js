import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: undefined
    };
    this.searchRows = this.searchRows.bind(this);
  }

  searchRows(query) {
    if (!this.props.rows) return;
    if (isNaN(query)) query = query.toLowerCase();
    let searchResult = this.props.rows.filter(row => {
      let result = Object.keys(row).filter(column => {
        if (Array.isArray(row[column])) {
          return row[column].filter(subcolumn => {
            if (isNaN(subcolumn)) {
              if (subcolumn.toLowerCase().startsWith(query)) return row;
            } else if (subcolumn === query) return row;
            return null;
          });
        }
        if (isNaN(row[column])) {
          if (row[column].toLowerCase().startsWith(query)) {
            return row;
          }
        } else if (row[column] === query) {
          return row;
        } else if (row[column] === Number(query)) {
          return row;
        }
        return null;
      });
      return result.length > 0;
    });
    this.setState({ searchResult });
  }

  renderHeaders() {
    if (this.props.headers)
      return (
        <thead>
          <tr>
            {this.props.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {this.hasActions() && (
              <th style={{ width: 150 }}>Acciones</th>
            )}
          </tr>
        </thead>
      );
  }

  hasActions() {
    return (
      this.props.editRow || this.props.deleteRow || this.props.customActions
    );
  }

  renderColumns(row) {
    return Object.keys(row).map((column, index) => {
      if (this.props.exclude) {
        if (this.props.exclude.includes(column)) return null;
      }
      if (column !== this.props.idRow || this.props.displayIdRow) {
        if (Array.isArray(row[column])) {
          return row[column].map((property, idx) => {
            if (this.props.editedRow)
              if (
                row[this.props.idRow] === this.props.editedRow[this.props.idRow]
              )
                return (
                  <td key={"col" + idx}>
                    <Input
                      type={
                        isNumber(property[this.props.columnKey])
                          ? "number"
                          : "text"
                      }
                      value={property[this.props.columnKey]}
                      modifier={this.props.inputModifier}
                      args={property[this.props.columnKey]}
                    />
                  </td>
                );
            return <td key={"col" + idx}>{property[this.props.columnKey]}</td>;
          });
        }
        if (this.props.editedRow) {
          if (this.props.editedRow[this.props.idRow] === row[this.props.idRow])
            return (
              <td key={"col" + index}>
                <Input
                  type={isNumber(row[column]) ? "number" : "text"}
                  value={this.props.editedRow[column]}
                  modifier={this.props.inputModifier}
                  args={[column, this.props.reducer]}
                />
              </td>
            );
        }
        return <td key={"col-" + index}>{row[column]}</td>;
      }
      return null;
    });
  }

  renderActions(row) {
    if (this.props.editedRow) {
      if (this.props.editedRow[this.props.idRow] === row[this.props.idRow])
        return (
          <td>
            <Button
              variant="outline-primary"
              onClick={() => this.props.saveRow(row, this.props.reducer)}
            >
              Guardar
            </Button>
          </td>
        );
    }
    return (
      <td>
        {this.props.editRow && (
          <Button
            variant="link"
            className="text-accent"
            onClick={() => this.props.editRow(row, this.props.reducer)}
          >
            <i className="fa fa-edit" />
          </Button>
        )}
        {this.props.deleteRow && this.props.confirm ? (
          <Button
            variant="link"
            className="text-danger"
            onClick={() =>
              this.props.confirm(
                `¿Está seguro que desea eliminar el ${this.props.rowName} ${
                  row[this.props.nameCol]
                }? ${this.props.consequence ? this.props.consequence : ""}`,
                () => this.props.deleteRow(row, this.props.reducer)
              )
            }
          >
            <i className="fa fa-trash" />
          </Button>
        ) : (
          this.props.deleteRow && (
            <Button
              variant="link"
              className="text-danger"
              onClick={() => this.props.deleteRow(row[this.props.idRow])}
            >
              <i className="fa fa-trash" />
            </Button>
          )
        )}
        {this.props.customActions &&
          this.props.customActions.map((action, index) => {
            return (
              <Button
                key={index}
                variant="link"
                className={action.className}
                onClick={() => action.action(row)}
              >
                <i className={action.icon}></i>
              </Button>
            );
          })}
      </td>
    );
  }

  renderRows() {
    let rowsToRender;
    if (this.state.searchResult) {
      rowsToRender = this.state.searchResult;
    } else if (this.props.rows) {
      rowsToRender = this.props.rows;
    }
    if (!rowsToRender) return <></>;
    return (
      <tbody>
        {rowsToRender.map((row, index) => {
          return (
            <tr
              key={"row" + index}
              onClick={
                this.props.viewRow
                  ? () => this.props.viewRow(row[this.props.idRow])
                  : () => {}
              }
              className={this.props.viewRow ? "pointer-cursor" : ""}
            >
              {this.renderColumns(row)}
              {this.hasActions() ? this.renderActions(row) : <></>}
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderSearchBox() {
    if (this.props.searchBox)
      return (
        <SearchBox
          searchModifier={this.searchRows}
          placeholder={this.props.placeholder}
        />
      );
  }

  render() {
    return (
      <Fragment>
        {this.renderSearchBox()}
        <Table>
          {this.renderHeaders()}
          {this.renderRows()}
        </Table>
      </Fragment>
    );
  }
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
  customActions: PropTypes.objectOf(
    PropTypes.objectOf({
      name: PropTypes.string,
      action: PropTypes.func,
      icon: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  searchBox: PropTypes.bool,
  confirm: PropTypes.func
};

export default AdminTable;
