import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner.js";
import {
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Typography
} from "@material-ui/core";
import { SupervisorAccount, ArrowRightAlt } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 600
  },
  inline: {
    display: "inline"
  },
  tablecells: {
    padding: `0 0 0 .7rem`
  }
});

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      //Add the balances of each client to the total var with init value of 0
      //And checking that the balance is a string
      //And convertinng it to a float for math operation
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      //returning total to the state
      return { totalOwed: total };
    }
    return null;
  }
  render() {
    const { classes, clients } = this.props;
    const { totalOwed } = this.state;

    // const client = [
    //   {
    //     id: "344",
    //     firstName: "Kelvin",
    //     lastName: "James",
    //     email: "kevj@gmail.com",
    //     phone: "0809999933",
    //     balance: "50"
    //   }
    // ];

    if (clients) {
      return (
        <div>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h4" color="default">
                <SupervisorAccount />
                Clients
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="title" color="textSecondary">
                Total Owed{" "}
                <Typography
                  component="span"
                  variant="headline"
                  className={classes.inline}
                  color="primary"
                >
                  N{totalOwed.toFixed(2)}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecells}>Name</TableCell>
                  <TableCell className={classes.tablecells}>Email</TableCell>
                  {/* <TableCell  className={classes.tablecells}>
                    Phone
                  </TableCell> */}
                  <TableCell className={classes.tablecells}>Balance</TableCell>
                  <TableCell className={classes.tablecells} />
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map(client => (
                  <TableRow key={client.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tablecells}
                    >
                      {client.firstName} {client.lastName}
                    </TableCell>
                    <TableCell className={classes.tablecells}>
                      {client.email}
                    </TableCell>
                    {/* <TableCell align='right' className={classes.tablecells}>
                      {client.phone}
                    </TableCell> */}
                    <TableCell className={classes.tablecells}>
                      N{parseFloat(client.balance).toFixed(2)}
                    </TableCell>
                    <TableCell className={classes.tablecells}>
                      <Button
                        color="primary"
                        size="small"
                        variant="text"
                        component={Link}
                        to={`/client/${client.id}`}
                      >
                        <ArrowRightAlt />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    } else {
      return <Spinner size={50} color={"red"} />;
    }
  }
}

// Passing the material-ui class to the props
const Client = withStyles(styles)(Clients);

//connecting this component to the redux Provider
//and mapping the state to props @this.state.clients
//form the firestore recieved data
//gotten fro the clients collection in firestore
export default compose(
  firestoreConnect(["clients"]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Client);
