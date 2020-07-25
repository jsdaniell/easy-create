import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import {
  DeveloperBoard,
  Visibility,
  PictureAsPdfRounded
} from "@material-ui/icons";
import { useDispatch } from "react-redux";
import exportOnPdf from "../../utils/exportOnPdf";

export default function TestListItem({ test }) {
  function getColor(priority) {
    switch (priority) {
      case "1":
        return "#74CC00";
      case "2":
        return "#FFD400";
      case "3":
        return "#FF7102";
      default:
        return "#EAEAEA";
    }
  }

  const dispatch = useDispatch();

  return (
    <Grid
      item
      container
      alignItems={"space-between"}
      md={12}
      style={{
        height: 50,
        backgroundColor: "white",
        borderRadius: 5
      }}
    >
      <Grid
        item
        container
        md={12}
        alignItems={"center"}
        style={{ height: 45, padding: "0px 8px" }}
        justify={"space-between"}
      >
        <Grid item md={1} xs={4}>
          <DeveloperBoard
            style={{ verticalAlign: "middle" }}
            color={"primary"}
          />
        </Grid>
        <Grid item md={9} xs={4}>
          <Typography>{test.title}</Typography>
        </Grid>
        <Grid item md={1} xs={4}>
          <IconButton
            size={"small"}
            onClick={() => {
              exportOnPdf(test);
            }}
          >
            <PictureAsPdfRounded
              style={{ verticalAlign: "middle" }}
              color={"primary"}
            />
          </IconButton>
        </Grid>

        <Grid item md={1} xs={4}>
          <IconButton
            size={"small"}
            onClick={() => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: test
              });
            }}
          >
            <Visibility style={{ verticalAlign: "middle" }} color={"primary"} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        item
        md={12}
        style={{
          backgroundColor: getColor(test.priority),
          height: 5,
          borderRadius: "0px 0px 5px 5px"
        }}
      ></Grid>
    </Grid>
  );
}
