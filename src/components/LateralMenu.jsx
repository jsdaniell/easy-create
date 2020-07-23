import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { ReactComponent as MainSvg } from "../assets/main.svg";
import { useTranslation } from "react-i18next";

export default function LateralMenu() {
  const { t } = useTranslation();

  return (
    <Grid
      item
      container
      style={{ padding: "0px 0px 20px 0px" }}
      justify={"space-between"}
      alignItems={"space-between"}
    >
      <Typography variant={"body2"} style={{ color: "white" }}>
        {t("testCaseDescription")}
      </Typography>
      <Grid
        md={12}
        item
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignSelf: "center"
        }}
      >
        <MainSvg height={340} />
      </Grid>

      <Grid item md={12} style={{ alignSelf: "flex-end" }}>
        <Typography variant={"h5"} style={{ color: "white" }}>
          {t("inspirationTitle")}
        </Typography>
        <Typography
          variant={"body2"}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {t("inspirationDescription1")}
          <a
            style={{ color: "white", textDecoration: "none" }}
            href={"#"}
            onClick={() => {
              window.open("https://www.linkedin.com/in/joana-leite-82212a197/");
            }}
          >
            Joana Leite
          </a>
          {t("inspirationDescription2")}
          <a
            style={{ color: "white", textDecoration: "none" }}
            href={"#"}
            onClick={() => {
              window.open("https://www.linkedin.com/in/joana-leite-82212a197/");
            }}
          >
            Joana Leite
          </a>
          {t("inspirationDescription3")}
        </Typography>
      </Grid>
    </Grid>
  );
}
