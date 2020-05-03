import React from "react";
import "./TraitTable.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import { green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class TraitRow extends React.Component {
  types = ["TURNKEY", "DATA ENRICHMENT", "CUSTOM", "HEALTH", "CLIENT"];

  handleInputChange = (event) => {
    // this.setState({ [event.target.name]: event.target.value });
    // this.props
    this.props.editField(
      this.props.data.id,
      event.target.name,
      event.target.value
    );
  };

  render() {
    let stateIndicator;
    if (this.props.data.loading) {
      stateIndicator = <CircularProgress />;
    } else if (this.props.data.submitted) {
      if (this.props.data.success) {
        stateIndicator = <DoneIcon style={{ color: green[500] }} />;
      } else {
        stateIndicator = <ErrorIcon color="error" />;
      }
    }
    return (
      <tr>
        <td className="icon-cell">{stateIndicator}</td>
        <td>
          <TextField
            name="name"
            label="Name"
            value={this.props.data.name}
            onChange={(e) => this.handleInputChange(e)}
          />
        </td>
        <td>
          <FormControl>
            <InputLabel>Type</InputLabel>
            <Select
              style={{ width: 150 }}
              labelWidth={10}
              name="type"
              value={this.props.data.type}
              onChange={(e) => this.handleInputChange(e)}
            >
              {this.types.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </td>
        <td>
          <TextField
            name="sid"
            label="SID"
            value={this.props.data.sid}
            onChange={(e) => this.handleInputChange(e)}
          />
        </td>
        <td>
          <TextField
            name="provider"
            label="Provider"
            value={this.props.data.provider}
            onChange={(e) => this.handleInputChange(e)}
          />
        </td>
        <td>
          <TextField
            name="source"
            label="Source"
            value={this.props.data.source}
            onChange={(e) => this.handleInputChange(e)}
          />
        </td>
        <td>
          <IconButton
            aria-label="delete"
            onClick={() => this.props.remove(this.props.data.id)}
            disabled={this.props.data.submitted}
          >
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    );
  }
}

export default TraitRow;
