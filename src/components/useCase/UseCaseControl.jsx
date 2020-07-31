import React from "react";
import { Grid } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";

export default function UseCaseControl() {
  const isMobile = DevicesUtils.checkIfIsMobile();

  return (
    <Grid
      item
      container
      style={{
        padding: isMobile ? "0px 20px 20px" : "0px 20px 40px",
        height: isMobile ? "82%" : "92%",
        alignContent: isMobile ? "normal" : "space-between"
      }}
      justify={"center"}
      spacing={1}
    ></Grid>
  );
}
