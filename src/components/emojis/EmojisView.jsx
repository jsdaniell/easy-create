import React from "react";
import { Grid } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";

export default function EmojisView() {
  return (
    <Grid
      container
      style={{
        padding: DevicesUtils.checkIfIsMobile() ? "25px 25px" : "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={2}
    >
      View
    </Grid>
  );
}
