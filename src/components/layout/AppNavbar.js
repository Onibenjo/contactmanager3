import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import AppBar from "@material-ui/core/AppBar";
import { Button, Link as MuiLink } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 160;

const styles = theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  nav: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  details: {
    flexGrow: 0.5,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  details2: {
    flexGrow: 0.5,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

class AppNavbar extends React.Component {
  state = {
    mobileOpen: false,
    isAuth: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  onLogout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { classes, theme, auth } = this.props;
    const {allowReg} = this.props.settings;
    const { isAuth } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          {isAuth ? (
            <React.Fragment>
              <ListItem button color="primary" divider>
                <ListItemText>
                  <MuiLink
                    component={Link}
                    to="/"
                    underline="hover"
                    variant="inherit"
                    block={true}
                  >
                    DashBoard
                  </MuiLink>
                </ListItemText>
              </ListItem>
              <ListItem button color="primary" divider>
                <ListItemText>
                  <MuiLink to="/client/add" underline="hover" block={true} component={Link}>
                    Add
                  </MuiLink>
                </ListItemText>
              </ListItem>
              <ListItem button color="primary">
                <ListItemText>
                  <Typography variant='h6' onClick={this.onLogout}>Logout</Typography>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ) : allowReg ? (
            <React.Fragment>
              <ListItem button color="primary" divider>
                <ListItemText>
                  <MuiLink
                    component={Link}
                    to="/login"
                    underline="hover"
                    variant="inherit"
                    block={true}
                  >
                    Login
                  </MuiLink>
                </ListItemText>
              </ListItem>
              <ListItem button color="primary" divider>
                <ListItemText>
                  <MuiLink to="/register" underline="hover" block={true} component={Link}>
                    Register
                  </MuiLink>
                </ListItemText>
              </ListItem>
            </React.Fragment>
          ):null}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              ClientPanel
            </Typography>
            {isAuth ? (
              <div className={classes.details}>
                <MuiLink
                  to="/"
                  color='inherit'
                  component={Link}
                  className={classes.nav}
                >
                  DashBoard
                </MuiLink>
                <MuiLink
                  color='inherit'
                  to="/client/add"
                  component={Link}
                  className={classes.nav}
                >
                  Add
                </MuiLink>
              </div>
            ) : null}
            {isAuth ? (
              <div className={classes.details2}>
                <Typography variant="subheading" color="inherit">
                  {auth.email}
                </Typography>
                <MuiLink component={Link} to='/settings' underline='none' color='inherit'>Settings</MuiLink>
                <Button
                  size='small'
                  variant="text"
                  onClick={this.onLogout}
                  className={classes.nav}
                >
                  Logout
                </Button>
              </div>
            ) : allowReg ? (
              <div className={classes.details}>
                <MuiLink
                  to="/login"
                  color='inherit'
                  component={Link}
                  className={classes.nav}
                >
                  Login
                </MuiLink>
                <MuiLink
                  color='inherit'
                  to="/register"
                  component={Link}
                  className={classes.nav}
                >
                  Register
                </MuiLink>
              </div>
            ): null}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(withStyles(styles, { withTheme: true })(AppNavbar));
