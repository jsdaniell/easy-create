import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { ReactComponent as MainSvg } from "../../assets/main.svg";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  return (
    <Grid
      item
      container
      style={{ padding: "0px 0px 20px 0px" }}
      justify={"space-between"}
      alignItems={"space-between"}
    ></Grid>
  );
}
