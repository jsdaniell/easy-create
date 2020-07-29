import React from "react";
import {
  Grid,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Emoji } from "emoji-mart";
import { FileCopyRounded } from "@material-ui/icons";
import copy from "copy-to-clipboard";

export default function EmojisView() {
  const { t } = useTranslation();

  const emojiRedux = useSelector(state => state.selectedEmojiReducer);

  return (
    <Grid
      container
      style={{
        padding: DevicesUtils.checkIfIsMobile() ? "25px 25px" : "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={1}
    >
      <Grid item md={12} xs={12} style={{ textAlign: "center" }}>
        <Typography variant={"h5"}>{t("emojiInfoTitle")}</Typography>
      </Grid>

      <Grid
        item
        md={3}
        xs={12}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <Emoji tooltip={true} emoji={emojiRedux.selectedEmoji} size={100} />
        <Typography
          variant={"body2"}
          style={{ color: "rgba(000,000,000,0.5)", textAlign: "center" }}
        >
          Native
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <Emoji
          tooltip={true}
          set={"google"}
          emoji={emojiRedux.selectedEmoji}
          size={100}
        />
        <Typography
          variant={"body2"}
          style={{ color: "rgba(000,000,000,0.5)", textAlign: "center" }}
        >
          Google
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <Emoji
          tooltip={true}
          set={"twitter"}
          emoji={emojiRedux.selectedEmoji}
          size={100}
        />
        <Typography
          variant={"body2"}
          style={{ color: "rgba(000,000,000,0.5)", textAlign: "center" }}
        >
          Twitter
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <Emoji
          tooltip={true}
          set={"facebook"}
          emoji={emojiRedux.selectedEmoji}
          size={100}
        />
        <Typography
          variant={"body2"}
          style={{ color: "rgba(000,000,000,0.5)", textAlign: "center" }}
        >
          Facebook
        </Typography>
      </Grid>

      <Grid item md={3} xs={12} style={{ textAlign: "center" }}>
        <TextField
          disabled
          variant={"outlined"}
          fullWidth
          label={"Unicode"}
          value={emojiRedux.selectedEmoji.unified}
          inputProps={{ min: 0, style: { textAlign: "left" } }}
          size={"small"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => copy(emojiRedux.selectedEmoji.unified)}
                  edge="end"
                  size={"small"}
                >
                  <FileCopyRounded fontSize={"small"} color={"primary"} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item md={2} xs={12} style={{ textAlign: "center" }}>
        <TextField
          disabled
          variant={"outlined"}
          fullWidth
          label={"Emoji"}
          value={emojiRedux.selectedEmoji.native}
          inputProps={{ min: 0, style: { textAlign: "left" } }}
          size={"small"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => copy(emojiRedux.selectedEmoji.native)}
                  edge="end"
                  size={"small"}
                >
                  <FileCopyRounded fontSize={"small"} color={"primary"} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <Grid item md={5} xs={12} style={{ textAlign: "center" }}>
        <TextField
          disabled
          variant={"outlined"}
          fullWidth
          inputProps={{ min: 0, style: { textAlign: "left" } }}
          label={"ID"}
          value={emojiRedux.selectedEmoji.id}
          size={"small"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => copy(emojiRedux.selectedEmoji.id)}
                  edge="end"
                  size={"small"}
                >
                  <FileCopyRounded fontSize={"small"} color={"primary"} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  );
}
