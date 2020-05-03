import React from "react";
import "./TraitTable.css";
import TraitRow from "./TraitRow";
import Papa from "papaparse";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class TraitTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { traitRows: [], index: 0 };
  }

  fileHeaders = ["NAME", "TYPE", "SID", "PROVIDER", "SOURCE"];
  // fileHeaders = ["name", "type", "sid", "provider", "source"];

  defaultRow = {
    name: "",
    type: "",
    sid: "",
    provider: "",
    source: "",
  };

  fileUpload = (event) => {
    let file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        let index = this.state.index;
        for (let row of results.data) {
          row.type = row.type.trim();
          row.id = index++;
        }
        this.setState({ index: index });
        this.setState({ traitRows: results.data });
        console.log(this.state);
      },
    });
  };

  addRow = () => {
    let deepCopy = JSON.parse(JSON.stringify(this.state.traitRows));
    let defaultRowCopy = JSON.parse(JSON.stringify(this.defaultRow));

    defaultRowCopy.id = this.state.index;
    deepCopy.push(defaultRowCopy);

    this.setState({ traitRows: deepCopy });
    this.setState({ index: this.state.index + 1 });
  };

  removeRow = (id) => {
    let deepCopy = JSON.parse(JSON.stringify(this.state.traitRows));
    let filteredList = deepCopy.filter(function (item) {
      return item.id !== id;
    });
    this.setState({ traitRows: filteredList });
  };

  editRow = (id, fieldName, fieldValue) => {
    let deepCopy = JSON.parse(JSON.stringify(this.state.traitRows));

    deepCopy.find((row, i) => {
      if (row.id === id) {
        deepCopy[i][fieldName] = fieldValue;
        return true;
      }
      return false;
    });
    this.setState({ traitRows: deepCopy });
  };

  submit = () => {
    let rows = JSON.parse(JSON.stringify(this.state.traitRows));

    let errorOrNot = false;
    for (let row of rows) {
      if (!row.uploaded) {
        row.loading = true;
        this.setState({ traitRows: rows });

        this.sleep(1000).then(() => {
          row.loading = false;
          row.uploaded = true;
          row.submitted = true;
          row.success = errorOrNot;
          errorOrNot = !errorOrNot;
          console.log(row);
          this.setState({ traitRows: rows });
        });
      }
    }
  };

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  render() {
    return (
      <Paper className="paper-container">
        <Button variant="contained" component="label">
          Choose File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={this.fileUpload}
          />
        </Button>
        <table>
          <tbody>
            <tr>
              <th className="hide-this">
                <CircularProgress />
              </th>
              {this.fileHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th className="hide-this">
                <CircularProgress />
              </th>
            </tr>

            {this.state.traitRows.map((row, index) => (
              <TraitRow
                key={row.id}
                data={row}
                editField={this.editRow}
                remove={this.removeRow}
              />
            ))}
            <tr>
              <td />
              <td colSpan={this.fileHeaders.length}>
                <Button
                  className="add-row-button"
                  variant="contained"
                  color="default"
                  onClick={this.addRow}
                >
                  <AddIcon />
                </Button>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <Grid container direction="row" justify="center" alignItems="center">
          <Button variant="contained" color="primary" onClick={this.submit}>
            submit
          </Button>
        </Grid>
      </Paper>
    );
  }
}

export default TraitTable;
