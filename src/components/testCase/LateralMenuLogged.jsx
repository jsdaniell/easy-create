import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Tooltip,
  CircularProgress,
  Badge
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";
import { getTestsGroups } from "../../database/testCaseQueries/getTestsGroups";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentsFromTestsGroup } from "../../database/testCaseQueries/getDocumentsFromTestsGroup";
import TestListItem from "./TestListItem";
import {
  NavigateNext,
  NavigateBefore,
  AddCircleOutline,
  PictureAsPdfRounded,
  Delete,
} from "@material-ui/icons";
import { addNewTestGroup } from "../../database/testCaseQueries/addNewTestGroup";
import { useSnackbar } from "notistack";
import { deleteOneGroup } from "../../database/testCaseQueries/deleteOneGroup";
import PopoverAddSome from "../shared/PopoverAddSome";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";
import { api } from "../../service/api";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userLogged = useSelector(state => state.userUidReducer);

  const testList = useSelector(state => state.testListDocsReducer);
  const testsGroups = useSelector(state => state.testGroupsReducer);
  const { enqueueSnackbar } = useSnackbar();

  const [anchorAddGroup, setAnchorAddGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const [showInvites, setShowInvites] = useState(false);
  const [invitesList, setInvitesList] = useState([]);

  const [invitesToMeList, setInvitesToMeList] = useState([]);
  const [anchorNotifications, setAnchorNotifications] = useState(false);

  const [usersFromGroup, setUsersFromGroup] = useState([]);

  const [loading, setLoading] = useState(false);

  async function getDocInvitesAndUsersOfAGroup(testGroupId, groupsList) {
    dispatch({
      type: "SET_TEST_GROUPS_STATE",
      payload: {
        list: groupsList,
        selected: testGroupId
      }
    });

    getDocumentsFromTestsGroup({
      groups: groupsList,
      user: userLogged,
      testGroupId: testGroupId,
      setState: data => {
        dispatch({
          type: "SET_LIST_DOCS",
          payload: data
        });
      }
    });

  }

  useEffect(() => {
    document.title = t("testCaseTitle");

    setLoading(true);


    getGroups()


    getTestsGroups({
      user: userLogged,
      setState: data => {

        // dispatch({
        //   type: "SET_TEST_GROUPS_STATE",
        //   payload: {
        //     list: data,
        //     selected: data[0]
        //   }
        // });

        // if (data.length) {
        //   getDocInvitesAndUsersOfAGroup(data[data.length - 1].itemId, data);
        // } else {
        //   addNewGroupOnList("Default");
        // }
      }
    }).then(() => setLoading(false));

  }, []);

  function getGroups(){



    dispatch({
      type: "SET_TEST_GROUPS_STATE",
      payload: {
        list: [
          {
            "title": "Somapay",
            "docId": "Somapay",
            "sharedWith": [
              {
                "user": "LKh7OLyN5bcEe2NJs3y1NVaLW9A3",
                "permission": "edit"
              }
            ]
          },
          {
            "title": "Look One",
            "docId": "look-one",
            "sharedWith": []
          }
        ],
        selected: {
          "title": "Somapay",
          "docId": "Somapay",
          "sharedWith": [
            {
              "user": "LKh7OLyN5bcEe2NJs3y1NVaLW9A3",
              "permission": "edit"
            }
          ]
        },
      }
    });
  }

  function navigate(nextOrBefore) {
    if (testList.length === 7) {
      setLoading(true);
      getDocumentsFromTestsGroup({
        groups: testsGroups.list,
        user: userLogged,
        testGroupId: testsGroups.selected,
        setState: data => {
          dispatch({
            type: "SET_LIST_DOCS",
            payload: data
          });
        },
        paginate: nextOrBefore,
        lastItem: testList[testList.length - 1].title
      }).then(() => setLoading(false));
    }
  }

  function addNewGroupOnList(optionalGroupName) {
    if (newGroupName || optionalGroupName) {
      setLoading(true);
      addNewTestGroup({
        user: userLogged,
        newCollectionName: newGroupName || optionalGroupName,
        errorAlreadyExists: () => {
          return enqueueSnackbar(t("alreadyExistsGroup"), {
            variant: "warning"
          });
        },
        setState: () => {
          getTestsGroups({
            user: userLogged,
            setState: data => {
              getDocInvitesAndUsersOfAGroup(data[0].itemId, data);
            }
          });

          setAnchorAddGroup(null);
          setNewGroupName("");
        }
      }).then(() => setLoading(false));
    }
  }

  async function switchTestGroup(id) {
    setLoading(true);
    await getDocInvitesAndUsersOfAGroup(id, testsGroups.list).then(() => {
      setLoading(false);
    });
  }

  function deleteSelectedGroup() {
    if (!testsGroups.list.length) return;

    setLoading(true);
    deleteOneGroup({
      collectionName: testsGroups.selected,
      user: userLogged,
      setState: () => {
        getTestsGroups({
          user: userLogged,
          setState: data => {
            getDocInvitesAndUsersOfAGroup(data[0].itemId, data);
          }
        });

        enqueueSnackbar(t("successRemovedGroup"), {
          variant: "success"
        });
      }
    }).then(() => setLoading(false));
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
            value={testsGroups.selected.docId}
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
