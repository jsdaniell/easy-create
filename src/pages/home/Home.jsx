import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import TestCaseModal from "../../components/TestCaseModal";

import LateralMenu from "../../components/LateralMenu";

export default function Home({
  children: {
    props: { component }
  }
}) {
  return (
    <Grid
      container
      justify={"space-between"}
      style={{
        minHeight: "100%",
        border: "1px solid white",
        borderRadius: 13
      }}
    >
      <Grid item container md={5} style={{ padding: 25 }}>
        <Grid item md={12}>
          <Typography
            variant={"subtitle2"}
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            devdata.tools was created by{" "}
            <a
              style={{ color: "white", textDecoration: "none" }}
              href={"#"}
              onClick={() => {
                window.open("https://github.com/jsdaniell");
              }}
            >
              @jsdaniell
            </a>
          </Typography>
          <Typography variant={"h5"} style={{ color: "white" }}>
            Test Case
          </Typography>

        </Grid>
        {component[0]()}
      </Grid>
      <Grid
        item
        container
        md={7}
        style={{
          borderRadius: 12,
          backgroundColor: "white",
          boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)",

          maxHeight: 1220,
          maxWidth: 632
        }}
      >
        {component[1]()}
      </Grid>
    </Grid>
  );
}
