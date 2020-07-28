import React from "react";
import {Grid} from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";

export default function GeneratorControl() {
    return  <Grid
        item
        container
        style={{
            padding: "0px 20px 20px",
            height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
            alignContent: DevicesUtils.checkIfIsMobile()
                ? "normal"
                : "space-between"
        }}
        justify={"space-between"}
        spacing={2}
    ></Grid>

}