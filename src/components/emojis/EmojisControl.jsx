import React from "react";
import { Grid, Typography } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";
import { ReactComponent as MockSvg } from "../../assets/mock.svg";

export default function EmojisControl() {
  const { t } = useTranslation();

  return (
    <Grid
      item
      container
      style={{
        padding: DevicesUtils.checkIfIsMobile()
          ? "0px 20px 20px"
          : "0px 20px 40px",
        height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
        alignContent: DevicesUtils.checkIfIsMobile() ? "normal" : "center"
      }}
      justify={"center"}
      spacing={1}
    >
      <Grid item>
        <Picker
          title={t("pickEmojiTitle")}
          emoji={"point_up"}
          theme={"light"}
          color={"#262A43"}
          exclude={["recent"]}
          onClick={emoji => console.log(emoji)}
          useButton={false}
          emojiTooltip={true}
          emojiSize={24}
          perLine={DevicesUtils.checkIfIsMobile() ? 7 : 12}
        />
      </Grid>

      <Grid item md={12}>
        <Typography
          variant={"body2"}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {t("generateDescription")}
        </Typography>
      </Grid>
    </Grid>
  );
}
