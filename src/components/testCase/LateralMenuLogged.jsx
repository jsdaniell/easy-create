import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";
import { useDispatch, useSelector } from "react-redux";
import TestListItem from "./TestListItem";
import {
  NavigateNext,
  NavigateBefore,
  AddCircleOutline,
  PictureAsPdfRounded,
  Delete
} from "@material-ui/icons";
import { useSnackbar } from "notistack";
import PopoverAddSome from "../shared/PopoverAddSome";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";
import {
  addNewGroup,
  deleteGroup,
  getDocumentsFromGroup,
  getGroups
} from "../../service/groupsServices";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const testList = useSelector(state => state.testListDocsReducer);
  const testsGroups = useSelector(state => state.testGroupsReducer);
  const { enqueueSnackbar } = useSnackbar();

  const [anchorAddGroup, setAnchorAddGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = t("testCaseTitle");

    setLoading(true);

    getGroups({
      type: "testsGroups",
      success: async data => {
        dispatch({
          type: "SET_TEST_GROUPS_STATE",
          payload: {
            list: data,
            selected: data[0]
          }
        });

        await getDocumentsFromGroup({
          type: "testsGroups",
          id: data[0].docId,
          success: data => {
            dispatch({
              type: "SET_LIST_DOCS",
              payload: data
            });
          },
          catchError: err =>
              enqueueSnackbar(err, {
                variant: "error"
              })
        });
        setLoading(false);
      },
      catchError: err =>
        enqueueSnackbar(err, {
          variant: "error"
        })
    });
  }, []);

  async function navigate(nextOrBefore) {
    setLoading(true);

    const {selected: {docId}} = testsGroups

    await getDocumentsFromGroup({
      type: "testsGroups",
      id: docId,
      success: data => {
        dispatch({
          type: "SET_LIST_DOCS",
          payload: data
        });
        setLoading(false)
      },
      catchError: err =>
          enqueueSnackbar(err, {
            variant: "error"
          }),
      paginate: nextOrBefore,
      lastDoc: testList[testList.length - 1].docId
    })
  }

  async function addNewGroupOnList() {
    if (newGroupName) {
      setLoading(true);

      await addNewGroup({
        type: "testsGroups",
        name: newGroupName,
        success: async data => {
          dispatch({
            type: "SET_TEST_GROUPS_STATE",
            payload: {
              list: data,
              selected: data[0]
            }
          });

          await getDocumentsFromGroup({
            type: "testsGroups",
            id: data[0].docId,
            success: data => {
              dispatch({
                type: "SET_LIST_DOCS",
                payload: data
              });
            },
            catchError: err =>
              enqueueSnackbar(err, {
                variant: "error"
              })
          });

          setLoading(false);
          setAnchorAddGroup(false);
        },
        catchError: err =>
          enqueueSnackbar(err, {
            variant: "error"
          })
      });
    }
  }

  async function switchTestGroup(id) {
    setLoading(true);

    dispatch({
      type: "SET_TEST_GROUPS_STATE",
      payload: {
        ...testsGroups,
        selected: testsGroups.list.find(item => item.docId === id)
      }
    });
    await getDocumentsFromGroup({
      type: "testsGroups",
      id: id,
      success: data => {
        dispatch({
          type: "SET_LIST_DOCS",
          payload: data
        });
      },
      catchError: err =>
        enqueueSnackbar(err, {
          variant: "error"
        })
    });

    setLoading(false);
  }

  async function deleteSelectedGroup() {
    if (!testsGroups.list.length) return;

    const {
      selected: { docId }
    } = testsGroups;

    setLoading(true);

    await deleteGroup({
      type: "testsGroups",
      id: docId,
      success: async data => {
        dispatch({
          type: "SET_TEST_GROUPS_STATE",
          payload: {
            list: data,
            selected: data[0]
          }
        });

        await getDocumentsFromGroup({
          type: "testsGroups",
          id: data[0].docId,
          success: data => {
            dispatch({
              type: "SET_LIST_DOCS",
              payload: data
            });
          },
          catchError: err =>
            enqueueSnackbar(err, {
              variant: "error"
            })
        });

        setLoading(false);
      },
      catchError: err =>
        enqueueSnackbar(err, {
          variant: "error"
        })
    });
  }

  const isMobile = DevicesUtils.checkIfIsMobile();

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: isMobile ? "82%" : "92%",
        alignContent: isMobile ? "normal" : "space-between"
      }}
      justify={"space-between"}
      spacing={2}
    >
      <PopoverAddSome
        anchor={anchorAddGroup}
        value={newGroupName}
        addFunction={addNewGroupOnList}
        setAnchor={setAnchorAddGroup}
        setValue={setNewGroupName}
      />

      <Grid container spacing={1} style={{ padding: 8 }} md={12} xs={12}>
        <Grid item md={4} xs={12}>
          <TextField
            id="standard-select-currency"
            select
            variant={"outlined"}
            value={testsGroups.selected?.docId}
            fullWidth
            color={"secondary"}
            onChange={event => switchTestGroup(event.target.value)}
            size={"small"}
            label={t("groupsLabel")}
          >
            {testsGroups.list.map(option => (
              <MenuItem key={option.docId} value={option.docId}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            onClick={event => setAnchorAddGroup(event.currentTarget)}
            icon={<AddCircleOutline color={"secondary"} />}
            titleTooltip={t("toolTipAddGroup")}
          />
        </Grid>
        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            onClick={() => {}}
            icon={
              <PictureAsPdfRounded
                style={{ color: "rgba(255, 255, 255, 0.5)" }}
                color={"secondary"}
              />
            }
            titleTooltip={t("tooltipExportGroup")}
          />
        </Grid>

        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            titleTooltip={t("tooltipDeleteAGroup")}
            icon={<Delete color={"secondary"} />}
            onClick={deleteSelectedGroup}
          />
        </Grid>
        <Grid item container md={12} xs={12}>
          {testList &&
            testList.map((doc, index) => (
              <TestListItem setLoading={setLoading} test={doc} />
            ))}
        </Grid>
      </Grid>

      {loading && (
        <Grid
          item
          container
          md={12}
          xs={12}
          style={{ alignContent: "center", justifyContent: "center" }}
        >
          <CircularProgress color={"secondary"} />
        </Grid>
      )}

      {!loading ? (
        <Grid item md={12} xs={12}>
          <Grid container justify={"flex-end"}>
            <Grid item>
              <IconButton size={"small"} onClick={() => navigate("previous")}>
                <NavigateBefore color={"secondary"} />
              </IconButton>
            </Grid>
            <Typography style={{ color: "white" }}>...</Typography>
            <Grid item>
              <IconButton size={"small"} onClick={() => navigate("next")}>
                <NavigateNext color={"secondary"} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
