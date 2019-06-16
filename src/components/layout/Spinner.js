import React from "react";
import spinner from "./spinner.gif";
import { ClipLoader } from "react-spinners";
// import CircularProgress from "@material-ui/core/CircularProgress";

export const Spinner1 = () => {
  return (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: "200px", margin: "auto", display: "block" }}
    />
  );
};
export default ({ size, color }) => {
  return (
    <div style={{ margin: 0, padding: 0, marginLeft: "30%" }}>
      {/* <CircularProgress
        style={{ margin: "auto", display: "block" }}
        color="secondary"
      /> */}
      <ClipLoader
        // css={override}
        sizeUnit={"px"}
        size={size}
        color={color}
        loading={true}
        style={{ margin: "0 auto", display: "block" }}
      />
    </div>
  );
};
