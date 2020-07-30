import React from "react";
import {
  Grid,
  TextField,
  Tooltip,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Emoji } from "emoji-mart";
import { FileCopyRounded } from "@material-ui/icons";
import copy from "copy-to-clipboard";
import { makeStyles } from "@material-ui/core/styles";
import CodeBlockVisualizer from "./CodeBlockVisualizer";

const useStyles = makeStyles({
  root: {
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      color: "#262A43",
      borderColor: "#262A43"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#262A43"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#262A43"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#262A43"
    }
  },
  select: {
    color: "#262A43",
    "&:before": {
      // normal
      color: "#262A43"
    },
    "&:after": {
      // focused
      color: "#262A43"
    }
  }
});

function EmojisView() {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const emojiRedux = useSelector(state => state.selectedEmojiReducer);

  const langs = ["javascript", "html", "css", "java", "dart"];

  return (
    <Grid
      container
      style={{
        padding: DevicesUtils.checkIfIsMobile() ? "25px 25px" : "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={2}
    >
      <Grid item md={12} xs={12} style={{ textAlign: "center" }}>
        <Typography variant={"h5"}>{t("emojiInfoTitle")}</Typography>
      </Grid>

      <Grid
        container
        spacing={1}
        justify={"center"}
        style={{
          alignContent: "space-evenly",
          minHeight: DevicesUtils.checkIfIsMobile() ? "0px" : 550
        }}
        spacing={1}
      >
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

        <Grid item md={2} xs={12} style={{ textAlign: "center" }}>
          <FormControl
            variant="outlined"
            className={classes.root}
            fullWidth
            size={"small"}
          >
            <InputLabel
              className={classes.select}
              id="demo-simple-select-outlined-label"
            >
              Example
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={emojiRedux.selectedLanguage}
              className={classes.root}
              inputProps={{ className: classes.select }}
              onChange={e =>
                dispatch({
                  type: "SET_SELECTED_EMOJI",
                  payload: {
                    ...emojiRedux,
                    selectedLanguage: e.target.value
                  }
                })
              }
              label="Language"
            >
              <MenuItem value="javascript">Javascript</MenuItem>
              <MenuItem value={"html"}>HTML</MenuItem>
              <MenuItem value={"css"}>CSS</MenuItem>

              <MenuItem value={"java"}>Java</MenuItem>

              <MenuItem value={"dart"}>Dart</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          md={10}
          xs={12}
          style={{
            textAlign: "center",

            backgroundColor: "#292A36",
            borderRadius: 8
          }}
        >
          <CodeBlockVisualizer
            unicode={emojiRedux.selectedEmoji.unified}
            selectedLanguage={emojiRedux.selectedLanguage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default EmojisView;
