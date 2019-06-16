import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";

const Sidebar = () => {
  return (
    <Link to="/client/add" style={{ textDecoration: "none" }}>
      <Button color="secondary" size="small" variant="contained">
        <AddIcon />
        New
      </Button>
    </Link>
  );
};

export default Sidebar;
