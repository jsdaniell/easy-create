import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import { ReactComponent as MainSvg } from "../../assets/tests.svg";
import { useTranslation } from "react-i18next";

export default function UseCaseNoLogged() {
  const { t } = useTranslation();

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: DevicesUtils.checkIfIsMobile() ? "88%" : "90%"
      }}
      justify={"space-between"}
      alignItems={"space-between"}
    >
      <Typography variant={"body2"} style={{ color: "white" }}>
        {t("useCaseDescription")}
      </Typography>
      <Grid
        md={12}
        item
        xs={12}
        style={{
          justifyContent: "center",
          textAlign: "center",
          alignSelf: "center"
        }}
      >
        <MainSvg
          width={DevicesUtils.checkIfIsMobile() ? "200px" : 340}
          height={DevicesUtils.checkIfIsMobile() ? "200px" : 340}
        />
      </Grid>

      <Grid
        item
        md={12}
        style={{
          alignSelf: DevicesUtils.checkIfIsMobile() ? "flex-start" : "flex-end",
          paddingBottom: DevicesUtils.checkIfIsMobile() ? 10 : 0
        }}
      >
        <Typography variant={"h5"} style={{ color: "white" }}>
          {t("inspirationTitle")}
        </Typography>
        <Typography
          variant={"body2"}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {t("inspirationDescription")}
        </Typography>
      </Grid>
    </Grid>
  );
}
