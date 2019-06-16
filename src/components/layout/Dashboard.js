/* eslint-disable no-unused-vars */
import React from "react";
import Client from "../client/Clients";
import Sidebar from "./Sidebar";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 180;

// const useStyles = makeStyles(theme => ({
const styles = theme => ({
  root: {
    display: "flex",
    padding: "0 .5rem"
  },
  content: {
    marginTop: theme.spacing.unit * 10,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing.unit * 3
    },
    flexGrow: 1
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

// const Dashboard = () => {
class Dashboard extends React.Component {
  render() {
    // const classes = useStyles();
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={8}
          className={classes.content}
          zeroMinWidth
        >
          <Grid item md={10} xs={10} sm={10} lg={10}>
            <Client />
          </Grid>
          <Grid item md={2} xs={1} sm={1} lg={2}>
            <Sidebar />
          </Grid>
        </Grid>
        <Fab color="secondary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);
