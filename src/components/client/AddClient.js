import React, { Component } from "react";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import red from "@material-ui/core/colors/red";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Spinner from "../layout/Spinner";
import { firestoreConnect } from "react-redux-firebase";
import { InputAdornment } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 160;
const styles = theme => ({
  root: {
    display: "flex"
  },

  content: {
    margin: `20vh auto 0`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,

      padding: theme.spacing.unit * 5
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: `700px`
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 3
    },
    flexGrow: 1
  },
  card: {
    width: "100%"
  },
  width: {
    width: "50%"
  },
  avatar: {
    backgroundColor: red[500]
  },
  CardContent: {
    pading: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  head: {
    backgroundColor: "#eeeeee",
    fontSize: "30",
    color: "#fff"
  }
});

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: "",
    sending: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = e => {
    this.setState({ sending: true });
    e.preventDefault();
    const newClient = this.state;
    // const { firstName, lastName, email, phone, balance } = newClient;
    const { firestore, history } = this.props;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };

  render() {
    const { classes } = this.props;
    const{disableBalOnAdd} = this.props.settings;
    // if (this.state.sending) {
    //   return <Spinner />;
    // } else {
    return (
      <div className={classes.content}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" color="secondary">
                C
              </Avatar>
            }
            title={<Typography variant="h4">Add Client</Typography>}
            className={classes.head}
          />

          <CardContent className={classes.CardContent}>
            <form className={classes.textField} onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                id="standard-name"
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                variant="outlined"
                required
              />
              <br />
              <TextField
                id="standard-name"
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                fullWidth
                variant="outlined"
                required
              />
              <br />
              <TextField
                type="email"
                id="standard-email"
                label="Email Address"
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                fullWidth
                variant="outlined"
                required
              />
              <br />
              <TextField
                className={classes.width}
                type="tel"
                id="standard-number"
                label="Phone Number"
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                margin="normal"
                variant="outlined"
                minLength="10"
                required
              />

              <TextField
                className={classes.width}
                id="outlined-adornment-amount"
                type="number"
                variant="outlined"
                label="Balance"
                disabled={disableBalOnAdd}
                value={this.state.balance}
                onChange={this.handleChange("balance")}
                margin="normal"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">N</InputAdornment>
                  )
                }}
              />
              <br />

              <input
                style={{ display: "none" }}
                id="contained-button-file"
                type="submit"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  component="span"
                  disabled={this.state.sending}
                >
                  Add {"  "}
                  {this.state.sending ? <Spinner size={20} /> : ""}
                </Button>
              </label>
            </form>
          </CardContent>
        </Card>
      </div>
    );
    // }
  }
}

export default compose(
  firestoreConnect(),
  connect(({settings}, props) => ({
    settings: settings
  }))
  )(withStyles(styles)(AddClient));
