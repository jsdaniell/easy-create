import React, { useEffect, useState } from "react";
import {
  Badge,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { getUseCaseGroups } from "../../database/useCaseQueries/getUseCaseGroups";
import PopoverAddSome from "../shared/PopoverAddSome";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";
import {
  AddCircleOutline,
  Delete,
  NavigateBefore,
  NavigateNext,
  Notifications,
  PersonAdd,
  PictureAsPdfRounded,
  SupervisedUserCircle
} from "@material-ui/icons";

import { getDocumentsFromUseCasesGroup } from "../../database/useCaseQueries/getDocumentsFromUseCasesGroups";
import { getInvitesUseCasesGroupsFromMe } from "../../database/useCaseQueries/getInvitesUseCasesGroupsFromMe";
import { getUsersOfThisUseCaseGroup } from "../../database/useCaseQueries/getUsersOfThisUseCaseGroup";
import { addNewUseCaseGroup } from "../../database/useCaseQueries/addNewUseCaseGroup";
import { deleteOneUseCaseGroup } from "../../database/useCaseQueries/deleteOneUseCaseGroup";
import UseCaseListItem from "./UseCaseListItem";
import {
  addNewGroup,
  deleteGroup,
  getDocumentsFromGroup,
  getGroups
} from "../../service/groupsServices";

export default function UseCaseControl() {
  const isMobile = DevicesUtils.checkIfIsMobile();

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();


  const useCaseGroups = useSelector(state => state.useCaseGroupsReducer);
  const useCaseList = useSelector(state => state.useCaseListDocsReducer);

  const { enqueueSnackbar } = useSnackbar();

  const [anchorAddGroup, setAnchorAddGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const USE_CASE_TYPE = "useCasesGroups";

  useEffect(() => {
    document.title = t("useCaseTitle");

    setLoading(true);

    getGroups({
      type: USE_CASE_TYPE,
      success: async data => {
        dispatch({
          type: "SET_USE_GROUPS_STATE",
          payload: {
            list: data,
            selected: data[0]
          }
        });

        await getDocumentsFromGroup({
          type: USE_CASE_TYPE,
          id: data[0].docId,
          success: data => {
            dispatch({
              type: "SET_USE_CASE_LIST_DOCS",
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

  async function switchUseCaseGroup(id) {
    setLoading(true);

    dispatch({
      type: "SET_USE_GROUPS_STATE",
      payload: {
        ...useCaseGroups,
        selected: useCaseGroups.list.find(item => item.docId === id)
      }
    });
    await getDocumentsFromGroup({
      type: USE_CASE_TYPE,
      id: id,
      success: data => {
        dispatch({
          type: "SET_USE_CASE_LIST_DOCS",
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

  async function addNewGroupOnList() {
    if (newGroupName) {
      setLoading(true);
      await addNewGroup({
        type: USE_CASE_TYPE,
        name: newGroupName,
        success: async data => {
          dispatch({
            type: "SET_USE_GROUPS_STATE",
            payload: {
              list: data,
              selected: data[0]
            }
          });

          await getDocumentsFromGroup({
            type: USE_CASE_TYPE,
            id: data[0].docId,
            success: data => {
              dispatch({
                type: "SET_USE_CASE_LIST_DOCS",
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

  async function deleteSelectedGroup() {
    if (!useCaseGroups.list.length) return;

    const {
      selected: { docId }
    } = useCaseGroups;

    setLoading(true);

    await deleteGroup({
      type: USE_CASE_TYPE,
      id: docId,
      success: async data => {
        dispatch({
          type: "SET_USE_GROUPS_STATE",
          payload: {
            list: data,
            selected: data[0]
          }
        });

        await getDocumentsFromGroup({
          type: USE_CASE_TYPE,
          id: data[0].docId,
          success: data => {
            dispatch({
              type: "SET_USE_CASE_LIST_DOCS",
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

  async function navigate(nextOrBefore) {
    setLoading(true);

    const {
      selected: { docId }
    } = useCaseGroups;

    await getDocumentsFromGroup({
      type: USE_CASE_TYPE,
      id: docId,
      success: data => {
        dispatch({
          type: "SET_USE_CASE_LIST_DOCS",
          payload: data
        });
        setLoading(false);
      },
      catchError: err =>
        enqueueSnackbar(err, {
          variant: "error"
        }),
      paginate: nextOrBefore,
      lastDoc: useCaseList[useCaseList.length - 1].docId
    });
  }

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
            value={useCaseGroups.selected?.docId}
            fullWidth
            color={"secondary"}
            onChange={event => switchUseCaseGroup(event.target.value)}
            size={"small"}
            label={t("groupsLabel")}
          >
            {useCaseGroups.list.map(option => (
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

        {!loading && (
          <Grid item container md={12} xs={12}>
            {useCaseList && useCaseList.map((doc, index) => (
              <UseCaseListItem setLoading={setLoading} useCase={doc} />
            ))}
          </Grid>
        )}
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
              <IconButton size={"small"} onClick={() => navigate("before")}>
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
