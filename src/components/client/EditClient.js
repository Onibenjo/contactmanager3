import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.up("sm")]: {
      maxWidth: `90vw`,
      padding: theme.spacing.unit * 5
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 3
    }
  },
  margin: {
    margin: theme.spacing.unit
  },
  padding: {
    padding: "1rem 2rem"
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

class EditClient extends Component {
  constructor(props) {
    super(props);
    //ref creation
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { classes, client } = this.props;
    const { disableBalOnEdit } = this.props.settings;
    if (client) {
      return (
        <div className={classes.container}>
          <Paper elevation={4} className={classes.padding}>
            <Grid container>
              <Grid item md={6}>
                <Link to="/">
                  <ArrowLeft /> DashBoard
                </Link>
              </Grid>
            </Grid>
            <Typography variant="headline" color="primary">
              Edit Client
            </Typography>
            <form onSubmit={this.onSubmit}>
              <FormControl className={classes.margin} required={true}>
                <InputLabel
                  shrink
                  htmlFor="bootstrap-input"
                  className={classes.bootstrapFormLabel}
                >
                  FirstName
                </InputLabel>
                <InputBase
                  id="bootstrap-input"
                  inputRef={this.firstNameInput}
                  defaultValue={client.firstName}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin} required={true}>
                <InputLabel
                  shrink
                  htmlFor="lastName"
                  className={classes.bootstrapFormLabel}
                >
                  LastName
                </InputLabel>
                <InputBase
                  id="lastName"
                  inputRef={this.lastNameInput}
                  defaultValue={client.lastName}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin} required={true}>
                <InputLabel
                  shrink
                  htmlFor="email"
                  className={classes.bootstrapFormLabel}
                >
                  Email
                </InputLabel>
                <InputBase
                  id="email"
                  inputRef={this.emailInput}
                  defaultValue={client.email}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin} required={true}>
                <InputLabel
                  shrink
                  htmlFor="phone"
                  className={classes.bootstrapFormLabel}
                >
                  Phone Number
                </InputLabel>
                <InputBase
                  type="tel"
                  id="phone"
                  inputRef={this.phoneInput}
                  defaultValue={client.phone}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin} required={true}>
                <InputLabel
                  shrink
                  htmlFor="balance"
                  className={classes.bootstrapFormLabel}
                >
                  Balance
                </InputLabel>
                <InputBase
                  type="number"
                  id="balance"
                  step=".01"
                  disabled={disableBalOnEdit}
                  inputRef={this.balanceInput}
                  defaultValue={client.balance}
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.margin}>
                <InputBase
                  type="submit"
                  classes={{
                    root: classes.bootstrapRoot,
                    input: classes.bootstrapInput
                  }}
                />
              </FormControl>
            </form>
          </Paper>
        </div>
      );
    } else {
      return (
        <div className={classes.container}>
          <Spinner size={50} color={"red"} />
        </div>
      );
    }
  }
}

EditClient.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(withStyles(styles)(EditClient));
