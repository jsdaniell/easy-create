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
import { inviteSomeoneToUseCaseGroup } from "../../database/useCaseQueries/inviteSomeoneToUseCaseGroup";
import InviteItemList from "../testCase/InviteItemList";
import SharedUserListItem from "../testCase/SharedUserListItem";
import UseCaseListItem from "./UseCaseListItem";

import { changingUserPermissionUseCase } from "../../database/useCaseQueries/changingUserPermissionUseCase";
import { deletingAnInviteUseCase } from "../../database/useCaseQueries/deletingAnInviteUseCase";
import { removingUserOfAUseCaseGroup } from "../../database/useCaseQueries/removeUserOfAUseCaseGroup";
import { getDocumentsFromTestsGroup } from "../../database/testCaseQueries/getDocumentsFromTestsGroup";
import PopoverNotificationList from "../shared/PopoverNotificationsList";
import { getTestsGroups } from "../../database/testCaseQueries/getTestsGroups";
import { verifyInvitesOfTestsGroupsToMe } from "../../database/testCaseQueries/verifyInvitesOfTestsGroupsToMe";
import { verifyInvitesOfUseCaseGroupsToMe } from "../../database/useCaseQueries/verifyInvitesOfUseCaseGroupsToMe";
import PopoverNotificationListUseCase from "./PopoverNotificationsListUseCase";
import SharedUserListItemUseCase from "./SharedUserListItemUseCase";

export default function UseCaseControl() {
  const isMobile = DevicesUtils.checkIfIsMobile();

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userLogged = useSelector(state => state.userUidReducer);

  const useCaseGroups = useSelector(state => state.useCaseGroupsReducer);

  const { enqueueSnackbar } = useSnackbar();
  const useCaseList = useSelector(state => state.useCaseListDocsReducer);
  const [anchorAddGroup, setAnchorAddGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [usersFromGroup, setUsersFromGroup] = useState([]);

  const [invitesList, setInvitesList] = useState([]);
  const [showInvites, setShowInvites] = useState(false);

  const [invitePersonEmail, setInvitePersonEmail] = useState("");
  const [personEditPermission, setPersonEditPermission] = useState(false);
  const [anchorPersonInvite, setAnchorPersonInvite] = useState(null);

  const [invitesToMeList, setInvitesToMeList] = useState([]);
  const [anchorNotifications, setAnchorNotifications] = useState(false);

  function checkPermissionOfEditGroup() {
    return (
      useCaseGroups &&
      useCaseGroups.list.length &&
      useCaseGroups.list.find(item => item.itemId === useCaseGroups.selected)
        .permission === "edit"
    );
  }

  async function getDocInvitesAndUsersOfAGroup(useCaseGroupId, groupsList) {
    dispatch({
      type: "SET_USE_GROUPS_STATE",
      payload: {
        list: groupsList,
        selected: useCaseGroupId
      }
    });

    getDocumentsFromUseCasesGroup({
      groups: groupsList,
      user: userLogged,
      useCasesGroupId: useCaseGroupId,

      setState: data => {
        dispatch({
          type: "SET_USE_CASE_LIST_DOCS",
          payload: data
        });
      }
    });
    getInvitesUseCasesGroupsFromMe({
      user: userLogged,
      collectionName: useCaseGroupId,
      setState: inv => {
        setInvitesList(inv);
      }
    });

    getUsersOfThisUseCaseGroup({
      user: userLogged,
      groups: groupsList,
      useCaseGroupId: useCaseGroupId,
      setState: users => {
        setUsersFromGroup(users);
      }
    });
  }

  useEffect(() => {
    document.title = t("useCaseTitle");

    setLoading(true);

    getUseCaseGroups({
      user: userLogged,
      setState: data => {
        if (data.length) {
          getDocInvitesAndUsersOfAGroup(data[data.length - 1].itemId, data);
        } else {
          addNewGroupOnList("Default");
        }
      }
    }).then(() => setLoading(false));

    verifyInvitesOfUseCaseGroupsToMe({
      user: userLogged,
      setState: data => setInvitesToMeList(data)
    });
  }, []);

  async function switchUseCaseGroup(id) {
    setLoading(true);
    await getDocInvitesAndUsersOfAGroup(id, useCaseGroups.list).then(() => {
      setLoading(false);
      setShowInvites(false);
    });
  }

  function addNewGroupOnList(optionalGroupName) {
    if (newGroupName || optionalGroupName) {
      setLoading(true);
      addNewUseCaseGroup({
        user: userLogged,
        newCollectionName: newGroupName || optionalGroupName,
        errorAlreadyExists: () => {
          return enqueueSnackbar(t("alreadyExistsGroup"), {
            variant: "warning"
          });
        },
        setState: () => {
          getUseCaseGroups({
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

  function checkIfIsOwner() {
    return (
      useCaseGroups &&
      useCaseGroups.list.length &&
      useCaseGroups.list.find(item => item.itemId === useCaseGroups.selected)
        .owner
    );
  }

  function deleteSelectedGroup() {
    if (useCaseGroups.list.length === 1) {
      return enqueueSnackbar(t("notDeleteUniqueGroupErrorMessage"), {
        variant: "warning"
      });
    }

    setLoading(true);
    deleteOneUseCaseGroup({
      collectionName: useCaseGroups.selected,
      user: userLogged,
      setState: () => {
        getUseCaseGroups({
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

  function inviteSomeoneToGroup() {
    if (invitePersonEmail) {
      setLoading(true);
      inviteSomeoneToUseCaseGroup({
        user: userLogged,
        collectionName: useCaseGroups.selected,
        userInvited: {
          email: invitePersonEmail,
          permission: personEditPermission
        },
        setState: () => {
          getInvitesUseCasesGroupsFromMe({
            user: userLogged,
            collectionName: useCaseGroups.selected,
            setState: inv => {
              setInvitesList(inv);
            }
          });

          getUsersOfThisUseCaseGroup({
            user: userLogged,
            groups: useCaseGroups.list,
            useCaseGroupId: useCaseGroups.selected,
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
    deletingAnInviteUseCase({
      invite,
      setState: () => {
        getInvitesUseCasesGroupsFromMe({
          user: userLogged,
          collectionName: useCaseGroups.selected,
          setState: inv => {
            setInvitesList(inv);
          }
        });

        getUsersOfThisUseCaseGroup({
          user: userLogged,
          groups: useCaseGroups.list,
          useCaseGroupId: useCaseGroups.selected,
          setState: users => {
            setUsersFromGroup(users);
          }
        });
      }
    }).then(() => setLoading(false));
  }

  function changeUserPermission(user) {
    setLoading(true);
    changingUserPermissionUseCase({
      user: userLogged,
      userToChangePermission: user,
      useCaseGroupId: useCaseGroups.selected,
      setState: () => {
        getInvitesUseCasesGroupsFromMe({
          user: userLogged,
          collectionName: useCaseGroups.selected,
          setState: inv => {
            setInvitesList(inv);
          }
        });
      }
    }).then(() => {
      getUsersOfThisUseCaseGroup({
        user: userLogged,
        groups: useCaseGroups.list,
        useCaseGroupId: useCaseGroups.selected,
        setState: users => {
          setUsersFromGroup(users);
        }
      });
      setLoading(false);
    });
  }

  function removeUserOfGroup(userToRemove) {
    setLoading(true);
    removingUserOfAUseCaseGroup({
      user: userLogged,
      userToRemove,
      group: useCaseGroups.selected,
      setState: () => {
        getUsersOfThisUseCaseGroup({
          user: userLogged,
          groups: useCaseGroups.list,
          useCaseGroupId: useCaseGroups.selected,
          setState: users => {
            setUsersFromGroup(users);
          }
        });
      }
    }).then(() => setLoading(false));
  }

  function navigate(nextOrBefore) {
    if (useCaseGroups.length === 7) {
      setLoading(true);
      getDocumentsFromUseCasesGroup({
        groups: useCaseGroups.list,
        user: userLogged,
        useCasesGroupId: useCaseGroups.selected,
        setState: data => {
          dispatch({
            type: "SET_USE_CASE_LIST_DOCS",
            payload: data
          });
        },
        paginate: nextOrBefore,
        lastItem: useCaseList[useCaseList.length - 1].title
      }).then(() => setLoading(false));
    }
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
            value={useCaseGroups.selected}
            fullWidth
            color={"secondary"}
            onChange={event => switchUseCaseGroup(event.target.value)}
            size={"small"}
            label={t("groupsLabel")}
          >
            {useCaseGroups.list.map(option => (
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
          <PopoverNotificationListUseCase
            anchor={anchorNotifications}
            setAnchor={setAnchorNotifications}
            invites={invitesToMeList}
            userLogged={userLogged}
            setState={() => {
              getUseCaseGroups({
                user: userLogged,
                setState: data => {
                  dispatch({
                    type: "SET_USE_GROUPS_STATE",
                    payload: {
                      list: data,
                      selected: data[0].itemId
                    }
                  });

                  getDocumentsFromUseCasesGroup({
                    groups: useCaseGroups.list,
                    user: userLogged,
                    useCasesGroupId: data[0].itemId,
                    setState: data => {
                      dispatch({
                        type: "SET_USE_CASE_LIST_DOCS",
                        payload: data
                      });
                    }
                  });
                }
              });

              verifyInvitesOfUseCaseGroupsToMe({
                user: userLogged,
                setState: data => setInvitesToMeList(data)
              });
              setAnchorNotifications(null);
            }}
          />
        </Grid>

        {!showInvites && !loading ? (
          <Grid item container md={12} xs={12}>
            {useCaseList.map((doc, index) => (
              <UseCaseListItem setLoading={setLoading} useCase={doc} />
            ))}
          </Grid>
        ) : !loading && (invitesList.length || usersFromGroup.length) ? (
          <Grid item container md={12} xs={12} style={{ paddingTop: 20 }}>
            {invitesList.map((item, inde) => (
              <InviteItemList item={item} cancelInvite={cancelInvite} />
            ))}
            {usersFromGroup.map((doc, index) => (
              <SharedUserListItemUseCase
                user={doc}
                changeUserPermission={changeUserPermission}
                removeUserOfGroup={removeUserOfGroup}
              />
            ))}
          </Grid>
        ) : (
          !loading &&
          !showInvites && (
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
                {t("noUsersInvited")}
              </Typography>
            </Grid>
          )
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
