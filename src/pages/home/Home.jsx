import React from "react";
import { Grid } from "@material-ui/core";
import TestCaseModal from "../../components/TestCaseModal";

import LateralMenu from "../../components/LateralMenu";

export default function Home() {
  return (
    <Grid
      container
      style={{ height: "100vh", backgroundColor: "#262A43", padding: 25 }}
    >
      <Grid item container md={5}>
        <LateralMenu />
      </Grid>
      <Grid
        item
        container
        md={7}
        style={{
          borderRadius: 12,
          backgroundColor: "white",
          boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)"
        }}
      >
        <TestCaseModal />
      </Grid>
    </Grid>
  );
}
