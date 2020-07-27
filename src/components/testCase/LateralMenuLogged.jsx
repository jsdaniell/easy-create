import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Tooltip,
  Popover
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
  PersonAdd,
  SupervisedUserCircle
} from "@material-ui/icons";
import { addNewTestGroup } from "../../database/testCaseQueries/addNewTestGroup";
import { useSnackbar } from "notistack";
import { deleteOneGroup } from "../../database/testCaseQueries/deleteOneGroup";
import PopoverAddSome from "../shared/PopoverAddSome";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";
import { inviteSomeoneToTestGroup } from "../../database/testCaseQueries/inviteSomeoneToTestGroup";
import { getInvitesTestsGroupsFromMe } from "../../database/testCaseQueries/getInvitesTestGroupsFromMe";
import InviteItemList from "./InviteItemList";
import { deletingAnInvite } from "../../database/testCaseQueries/deletingAnInvite";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userLogged = useSelector(state => state.userUidReducer);

  const testList = useSelector(state => state.testListDocsReducer);
  const testsGroups = useSelector(state => state.testGroupsReducer);
  const { enqueueSnackbar } = useSnackbar();

  const [anchorAddGroup, setAnchorAddGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const [invitePersonEmail, setInvitePersonEmail] = useState("");

  const [personEditPermission, setPersonEditPermission] = useState(false);
  const [anchorPersonInvite, setAnchorPersonInvite] = useState(null);

  const [showInvites, setShowInvites] = useState(false);
  const [invitesList, setInvitesList] = useState([]);

  useEffect(() => {
    getTestsGroups({
      user: userLogged,
      setState: data => {
        dispatch({
          type: "SET_TEST_GROUPS_STATE",
          payload: {
            list: data,
            selected: data[data.length - 1].itemId
          }
        });

        getDocumentsFromTestsGroup({
          user: userLogged,
          testGroupId: data[data.length - 1].itemId,
          setState: data => {
            dispatch({
              type: "SET_LIST_DOCS",
              payload: data
            });
          }
        });
        getInvitesTestsGroupsFromMe({
          user: userLogged,
          collectionName: data[data.length - 1].itemId,
          setState: inv => {
            setInvitesList(inv);
          }
        });
      }
    });
  }, []);

  function navigate(nextOrBefore) {
    if (testList.length === 7) {
      getDocumentsFromTestsGroup({
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
      });
    }
  }

  function addNewGroupOnList() {
    if (newGroupName) {
      addNewTestGroup({
        user: userLogged,
        newCollectionName: newGroupName,
        errorAlreadyExists: () => {
          return enqueueSnackbar(t("alreadyExistsGroup"), {
            variant: "warning"
          });
        },
        setState: () => {
          getTestsGroups({
            user: userLogged,
            setState: data => {
              dispatch({
                type: "SET_TEST_GROUPS_STATE",
                payload: {
                  list: data,
                  selected: data[0].itemId
                }
              });

              getDocumentsFromTestsGroup({
                user: userLogged,
                testGroupId: data[0].itemId,
                setState: data => {
                  dispatch({
                    type: "SET_LIST_DOCS",
                    payload: data
                  });
                }
              });
              getInvitesTestsGroupsFromMe({
                user: userLogged,
                collectionName: data[0].itemId,
                setState: inv => {
                  setInvitesList(inv);
                }
              });
            }
          });

          setAnchorAddGroup(null);
          setNewGroupName("");
        }
      });
    }
  }

  function switchTestGroup(id) {
    getDocumentsFromTestsGroup({
      user: userLogged,
      testGroupId: id,
      setState: data => {
        dispatch({
          type: "SET_LIST_DOCS",
          payload: data
        });

        dispatch({
          type: "SET_TEST_GROUPS_STATE",
          payload: {
            list: testsGroups.list,
            selected: id
          }
        });

        getInvitesTestsGroupsFromMe({
          user: userLogged,
          collectionName: id,
          setState: inv => {
            setInvitesList(inv);
          }
        });
      }
    });
  }

  function deleteSelectedGroup() {
    deleteOneGroup({
      collectionName: testsGroups.selected,
      user: userLogged,
      setState: () => {
        getTestsGroups({
          user: userLogged,
          setState: data => {
            dispatch({
              type: "SET_TEST_GROUPS_STATE",
              payload: {
                list: data,
                selected: data[0].itemId
              }
            });

            getDocumentsFromTestsGroup({
              user: userLogged,
              testGroupId: data[0].itemId,
              setState: data => {
                dispatch({
                  type: "SET_LIST_DOCS",
                  payload: data
                });
              }
            });
          }
        });

        enqueueSnackbar(t("successRemovedGroup"), {
          variant: "success"
        });
      }
    });
  }

  function inviteSomeoneToGroup() {
    if (invitePersonEmail) {
      inviteSomeoneToTestGroup({
        user: userLogged,
        collectionName: testsGroups.selected,
        userInvited: {
          email: invitePersonEmail,
          permission: personEditPermission
        },
        setState: () => {
          getInvitesTestsGroupsFromMe({
            user: userLogged,
            collectionName: testsGroups.selected,
            setState: inv => {
              setInvitesList(inv);
            }
          });
          setAnchorPersonInvite(null);
        },
        userNotExistError: () => {}
      });
    }
  }

  function cancelInvite(invite) {
    deletingAnInvite({
      invite,
      setState: () => {
        getInvitesTestsGroupsFromMe({
          user: userLogged,
          collectionName: testsGroups.selected,
          setState: inv => {
            setInvitesList(inv);
          }
        });
      }
    });
  }

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
        alignContent: "space-between"
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

      <PopoverAddSome
        anchor={anchorPersonInvite}
        value={invitePersonEmail}
        addFunction={inviteSomeoneToGroup}
        setAnchor={setAnchorPersonInvite}
        setValue={setInvitePersonEmail}
        label={"Email"}
        permission={personEditPermission}
        permissionLabel={t("editPermissionLabel")}
        setPermission={() => setPersonEditPermission(!personEditPermission)}
        permissible={true}
      />

      <Grid container spacing={1} style={{ padding: 8 }} md={12} xs={12}>
        <Grid item md={4} xs={12}>
          <TextField
            id="standard-select-currency"
            select
            variant={"outlined"}
            value={testsGroups.selected}
            fullWidth
            color={"secondary"}
            onChange={event => switchTestGroup(event.target.value)}
            size={"small"}
            label={t("groupsLabel")}
          >
            {testsGroups.list.map(option => (
              <MenuItem key={option.itemId} value={option.itemId}>
                {option.itemLabel}
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
        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            titleTooltip={t("tooltipAddPersonOnGroup")}
            icon={<PersonAdd color={"secondary"} />}
            onClick={event => setAnchorPersonInvite(event.currentTarget)}
          />
        </Grid>
        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            titleTooltip={"Edit Permissioned Users"}
            icon={<SupervisedUserCircle color={"secondary"} />}
            onClick={event => {
              setShowInvites(!showInvites);
            }}
          />
        </Grid>
        {!showInvites ? (
          <Grid item container md={12} xs={12}>
            {testList.map((doc, index) => (
              <TestListItem test={doc} />
            ))}
          </Grid>
        ) : (
          <Grid item container md={12} xs={12} style={{ paddingTop: 20 }}>
            {invitesList.map((item, inde) => (
              <InviteItemList item={item} cancelInvite={cancelInvite} />
            ))}
          </Grid>
        )}
      </Grid>

      {!showInvites ? (
        <Grid item md={12}>
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
