import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { Lock } from "@material-ui/icons";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  InputBase
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Alert from "../layout/Alert";
import { notifyUser } from "../../actions/notifyActions";

const styles = theme => ({
  root: {
    display: "flex"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: `${theme.spacing.unit * 3}px .5rem`
  },
  content: {
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.up("sm")]: {
      maxWidth: `90vw`,
      padding: theme.spacing.unit * 5
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 3
    },
    flexGrow: 1
  },
  bootstrapRoot: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  margin: {
    margin: theme.spacing.unit
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
  },
  padding: {
    padding: "1rem 2rem"
  }
});

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => notifyUser(err.message, "error"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes } = this.props;
    const { message, messageType } = this.props.notify;
    return (
      <div className={classes.content}>
        <Grid container justify="center" alignItems="center">
          <Grid item md={6}>
            <Paper className={classes.paper}>
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <Typography variant="headline" color="primary">
                <Lock /> Login
              </Typography>
              <form className={classes.padding} onSubmit={this.onSubmit}>
                <FormControl
                  className={classes.margin}
                  required={true}
                  fullWidth
                >
                  <InputLabel
                    shrink
                    htmlFor="email"
                    className={classes.bootstrapFormLabel}
                  >
                    Email
                  </InputLabel>
                  <InputBase
                    id="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    classes={{
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    }}
                  />
                </FormControl>
                <FormControl
                  className={classes.margin}
                  required={true}
                  fullWidth
                >
                  <InputLabel
                    shrink
                    htmlFor="password"
                    className={classes.bootstrapFormLabel}
                  >
                    Password
                  </InputLabel>
                  <InputBase
                    id="password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    classes={{
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    }}
                  />
                </FormControl>
                <FormControl className={classes.margin} fullWidth>
                  <InputBase
                    color="primary"
                    type="submit"
                    classes={{
                      root: classes.bootstrapRoot,
                      input: classes.bootstrapInput
                    }}
                    value="Login"
                  />
                </FormControl>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

//mappingStateToProps and mappingDispatchToprops
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(withStyles(styles)(Login));
