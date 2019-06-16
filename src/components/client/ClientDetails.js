import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import classnames from "classnames";
import {
  Button,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Typography,
  TextField
} from "@material-ui/core";
import { SubdirectoryArrowLeft } from "@material-ui/icons";
import Spinner from "../layout/Spinner";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import "../../App.css";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    padding: `${theme.spacing.unit} ${theme.spacing.unit * 2}px`,
    backgroundColor: "#eeeeee",
    fontSize: "30",
    color: "#fff"
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
  grid: {},
  name: {
    textTransform: "uppercase"
  },
  text: {
    display: "inline"
  }
});

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  //Updates the input form
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  //Updating the balance in the server
  onSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    //Update in firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };

  //Deleting the client from the server
  onDeleteClick = e => {
    const { client, firestore, history } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(() => history.push("/"));
  };

  render() {
    const { classes, client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";

    //should balnce form show
    balanceForm = showBalanceUpdate ? (
      <form onSubmit={this.onSubmit}>
        <TextField
          id="outlined-adornment-amount"
          type="number"
          variant="outlined"
          label="Balance"
          fullWidth
          value={balanceUpdateAmount}
          onChange={this.onChange}
          margin="normal"
          required
          name="balanceUpdateAmount"
        />
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="submit"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            fullWidth
            color="primary"
            component="span"
          >
            Update
          </Button>
        </label>
      </form>
    ) : null;
    if (client) {
      return (
        <section className={classes.root}>
          <div className={classes.content}>
            <Grid container spacing={32} justify="space-between">
              <Grid item md={6} xs={6} sm={6}>
                <Button component={Link} size="small" to="/">
                  <SubdirectoryArrowLeft /> to DashBoard
                </Button>
              </Grid>
              <Grid item md={6} xs={6} sm={6}>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "black", color: "white" }}
                    component={Link}
                    to={`/client/edit/${client.id}`}
                    className={classes.grid}
                  >
                    Edit
                  </Button>
                  {""}
                  <Button
                    variant="contained"
                    size="small"
                    className={classes.grid}
                    color="secondary"
                    onClick={this.onDeleteClick}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <hr />
            <Card>
              <CardHeader
                title={
                  <Typography variant="h5" className={classes.name}>
                    {client.firstName} {client.lastName}
                  </Typography>
                }
                className={classes.title}
              />
              <CardContent>
                <Grid container spacing={32}>
                  <Grid item md={8} sm={6}>
                    <Typography
                      variant="h5"
                      className={classes.text}
                      color="textPrimary"
                    >
                      Client ID:{" "}
                      <span style={{ color: "gray", fontSize: ".9rem" }}>
                        {client.id}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item md={3} sm={4}>
                    <Typography
                      variant="h5"
                      className={classes.text}
                      color="textPrimary"
                    >
                      Balance:{" "}
                      <span
                        className={classnames({
                          "text-danger": client.balance > 0,
                          "text-success": client.balance === 0
                        })}
                      >
                        N{parseFloat(client.balance).toFixed(2)}
                      </span>
                      <Edit
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !showBalanceUpdate
                          })
                        }
                      />
                    </Typography>
                    {balanceForm}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={classes.demo}>
                    <List dense={true}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Email: "
                          secondary={client.email}
                        />
                        <ListItemSecondaryAction>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Phone Number: "
                          secondary={client.phone}
                        />
                        <ListItemSecondaryAction>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </section>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(withStyles(styles)(ClientDetails));
