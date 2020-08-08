import React, { useEffect } from "react";
import { Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useTranslation } from "react-i18next";
import { ReactComponent as MockSvg } from "../../assets/mock.svg";
import { useDispatch, useSelector } from "react-redux";
import CodeBlockVisualizer from "./CodeBlockVisualizer";

export default function EmojisControl() {
  const { t } = useTranslation();
  const emojiRedux = useSelector(state => state.selectedEmojiReducer);

  const dispatch = useDispatch();

  const isMobile = DevicesUtils.checkIfIsMobile();

  function selectEmoji(emoji) {
    dispatch({
      type: "SET_SELECTED_EMOJI",
      payload: {
        ...emojiRedux,
        selectedEmoji: emoji
      }
    });
  }

  useEffect(() => {
    document.title = t("emojisLibTitle");
  }, []);

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
    >
      <Grid item>
        <Picker
          title={t("pickEmojiTitle")}
          emoji={"point_up"}
          theme={"light"}
          color={"#262A43"}
          exclude={["recent"]}
          onClick={emoji => selectEmoji(emoji)}
          useButton={false}
          emojiTooltip={true}
          emojiSize={24}
          perLine={isMobile ? 7 : 12}
        />
      </Grid>

      <Grid item md={12}>
        <Typography
          variant={"body2"}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {t("pickEmojiLibDesc")}
        </Typography>
      </Grid>
    </Grid>
  );
}
