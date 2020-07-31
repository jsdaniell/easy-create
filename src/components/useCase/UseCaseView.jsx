import React from "react";
import { Grid } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import UseCaseList from "./UseCaseList";

export default function UseCaseView() {
  const isMobile = DevicesUtils.checkIfIsMobile();

  return (
    <Grid
      container
      style={{
        padding: isMobile ? "25px 25px" : "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={2}
    >
      <UseCaseList />
    </Grid>
  );
}
