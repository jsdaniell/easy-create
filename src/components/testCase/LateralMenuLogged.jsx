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
  PersonAdd,
  SupervisedUserCircle,
  Notifications
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
import { verifyInvitesOfTestsGroupsToMe } from "../../database/testCaseQueries/verifyInvitesOfTestsGroupsToMe";
import PopoverNotificationList from "../shared/PopoverNotificationsList";
import { getUsersOfThisGroup } from "../../database/testCaseQueries/gettingUsersOfThisGroup";
import SharedUserListItem from "./SharedUserListItem";
import { changingUserPermission } from "../../database/testCaseQueries/changingUserPermission";
import { removingUserOfAGroup } from "../../database/testCaseQueries/removingUserOfAGroup";

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
    getInvitesTestsGroupsFromMe({
      user: userLogged,
      collectionName: testGroupId,
      setState: inv => {
        setInvitesList(inv);
      }
    });

    getUsersOfThisGroup({
      user: userLogged,
      groups: groupsList,
      testGroupId: testGroupId,
      setState: users => {
        setUsersFromGroup(users);
      }
    });
  }

  useEffect(() => {
    setLoading(true);

    getTestsGroups({
      user: userLogged,
      setState: data => {
        getDocInvitesAndUsersOfAGroup(data[data.length - 1].itemId, data).then(
          () => setLoading(false)
        );
      }
    });

    verifyInvitesOfTestsGroupsToMe({
      user: userLogged,
      setState: data => setInvitesToMeList(data)
    });
  }, []);

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

  function addNewGroupOnList() {
    if (newGroupName) {
      setLoading(true);
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
      setShowInvites(false);
    });
  }

  function deleteSelectedGroup() {
    if (!testsGroups.length) return;
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

  function checkPermissionOfEditGroup() {
    return (
      testsGroups &&
      testsGroups.list.length &&
      testsGroups.list.find(item => item.itemId === testsGroups.selected)
        .permission === "edit"
    );
  }

  function checkIfIsOwner() {
    return (
      testsGroups &&
      testsGroups.list.length &&
      testsGroups.list.find(item => item.itemId === testsGroups.selected).owner
    );
  }

  function inviteSomeoneToGroup() {
    if (invitePersonEmail) {
      setLoading(true);
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

          getUsersOfThisGroup({
            user: userLogged,
            groups: testsGroups.list,
            testGroupId: testsGroups.selected,
            setState: users => {
              setUsersFromGroup(users);
            }
          });
          setAnchorPersonInvite(null);
        },
        userInvitedError: () => {
          enqueueSnackbar(t("userAlreadyInvited"), {
            variant: "warning"
          });
        },
        userNotExistError: () => {
          enqueueSnackbar(t("userNotExists"), {
            variant: "warning"
          });
        }
      }).then(() => setLoading(false));
    }
  }

  function cancelInvite(invite) {
    setLoading(true);
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

        getUsersOfThisGroup({
          user: userLogged,
          groups: testsGroups.list,
          testGroupId: testsGroups.selected,
          setState: users => {
            setUsersFromGroup(users);
          }
        });
      }
    }).then(() => setLoading(false));
  }

  function removeUserOfGroup(userToRemove) {
    setLoading(true);
    removingUserOfAGroup({
      user: userLogged,
      userToRemove,
      group: testsGroups.selected,
      setState: () => {
        getUsersOfThisGroup({
          user: userLogged,
          groups: testsGroups.list,
          testGroupId: testsGroups.selected,
          setState: users => {
            setUsersFromGroup(users);
          }
        });
      }
    }).then(() => setLoading(false));
  }

  function changeUserPermission(user) {
    setLoading(true);
    changingUserPermission({
      user: userLogged,
      userToChangePermission: user,
      testGroupId: testsGroups.selected,
      setState: () => {
        getInvitesTestsGroupsFromMe({
          user: userLogged,
          collectionName: testsGroups.selected,
          setState: inv => {
            setInvitesList(inv);
          }
        });
      }
    }).then(() => {
      getUsersOfThisGroup({
        user: userLogged,
        groups: testsGroups.list,
        testGroupId: testsGroups.selected,
        setState: users => {
          setUsersFromGroup(users);
        }
      });
      setLoading(false);
    });
  }

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
        alignContent: DevicesUtils.checkIfIsMobile()
          ? "normal"
          : "space-between"
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
        {checkPermissionOfEditGroup() && (
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
        )}
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

        {checkPermissionOfEditGroup() && checkIfIsOwner() && (
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
        )}
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
            titleTooltip={t("peopleInThisGroup")}
            icon={<SupervisedUserCircle color={"secondary"} />}
            onClick={event => {
              setShowInvites(!showInvites);
            }}
          />
        </Grid>
        <Grid
          item
          md={1}
          xs={3}
          style={{ alignSelf: "center", textAlign: "center" }}
        >
          <WhiteIconButtonWithTooltip
            titleTooltip={t("notificationsLabel")}
            icon={
              <Badge badgeContent={invitesToMeList.length} color={"primary"}>
                <Notifications color={"secondary"} />
              </Badge>
            }
            onClick={event => {
              if (invitesToMeList.length) {
                setAnchorNotifications(event.currentTarget);
              } else {
                console.log('You don"t have invites');
              }
            }}
          />
          <PopoverNotificationList
            anchor={anchorNotifications}
            setAnchor={setAnchorNotifications}
            invites={invitesToMeList}
            userLogged={userLogged}
            setState={() => {
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
                    groups: testsGroups.list,
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

              verifyInvitesOfTestsGroupsToMe({
                user: userLogged,
                setState: data => setInvitesToMeList(data)
              });
              setAnchorNotifications(null);
            }}
          />
        </Grid>
        {!showInvites && !loading ? (
          <Grid item container md={12} xs={12}>
            {testList.map((doc, index) => (
              <TestListItem setLoading={setLoading} test={doc} />
            ))}
          </Grid>
        ) : !loading && (invitesList.length || usersFromGroup.length) ? (
          <Grid item container md={12} xs={12} style={{ paddingTop: 20 }}>
            {invitesList.map((item, inde) => (
              <InviteItemList item={item} cancelInvite={cancelInvite} />
            ))}
            {usersFromGroup.map((doc, index) => (
              <SharedUserListItem
                user={doc}
                changeUserPermission={changeUserPermission}
                removeUserOfGroup={removeUserOfGroup}
              />
            ))}
          </Grid>
        ) : (
          <Grid
            item
            container
            md={12}
            xs={12}
            style={{
              alignContent: "center",
              justifyContent: "center",
              paddingTop: 20
            }}
          >
            <Typography
              variant={"h6"}
              style={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              {t('noUsersInvited')}
            </Typography>
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

      {!showInvites && !loading ? (
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
