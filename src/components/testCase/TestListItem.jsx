import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import {
  DeveloperBoard,
  Visibility,
  PictureAsPdfRounded,
  HighlightOffRounded
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import exportOnPdf from "../../utils/exportOnPdf";
import DevicesUtils from "../../utils/deviceUtils";
import {
  deleteDocument,
} from "../../service/groupsServices";
import { useSnackbar } from "notistack";

export default function TestListItem({ test, setLoading }) {
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

  const testsGroups = useSelector(state => state.testGroupsReducer);

  const { enqueueSnackbar } = useSnackbar();

  function deleting() {
    setLoading(true);

    const {
      selected: { docId }
    } = testsGroups;

    deleteDocument({
      type: "testsGroups",
      idGroup: docId,
      idDocument: test.docId,
      success: async data => {
        dispatch({
          type: "SET_LIST_DOCS",
          payload: data
        });
        setLoading(false);
      },
      catchError: err => {
        enqueueSnackbar(err, {
          variant: "error"
        });
        setLoading(false);
      }
    });
  }

  return (
    <Grid
      md={12}
      xs={12}
      item
      style={{
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 8
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
        <Grid item md={1} xs={1}>
          <DeveloperBoard
            style={{ verticalAlign: "middle" }}
            color={"primary"}
          />
        </Grid>
        <Grid item md={8} xs={8}>
          <Typography>{test.title}</Typography>
        </Grid>
        {!DevicesUtils.checkIfIsMobile() && (
          <Grid item md={1} xs={1}>
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
        )}

        <Grid item md={1} xs={1}>
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
        <Grid item md={1} xs={1}>
          <IconButton
            size={"small"}
            onClick={() => {
              deleting();
            }}
          >
            <HighlightOffRounded
              style={{ verticalAlign: "middle" }}
              color={"primary"}
            />
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
      />
    </Grid>
  );
}
