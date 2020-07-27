import React from "react";
import { Grid, Typography, Switch } from "@material-ui/core";
import { AccountCircle, Clear } from "@material-ui/icons";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";
import { useSelector } from "react-redux";

export default function SharedUserListItem({
  user,
  removeUserOfGroup,
  changeUserPermission
}) {
  const testsGroups = useSelector(state => state.testGroupsReducer);

  function checkPermissionOfEditGroup() {
    return (
      testsGroups &&
      testsGroups.list.length &&
      testsGroups.list.find(item => item.itemId === testsGroups.selected).owner
    );
  }

  return (
    <Grid
      container
      style={{
        borderRadius: 5,
        border: "1px solid white",
        minHeight: 40,
        alignContent: "center",
        padding: "5px 10px"
      }}
    >
      <Grid item md container style={{ alignContent: "center" }}>
        <AccountCircle color={"secondary"} style={{ paddingRight: 10 }} />
        <Typography style={{ color: "white" }}>{user.userEmail}</Typography>
      </Grid>
      {checkPermissionOfEditGroup() && (
        <Grid item style={{ alignItems: "center" }}>
          <Typography
            variant={"subtitle2"}
            style={{ color: "white", paddingTop: 4 }}
          >
            Editor{" "}
            <Switch
              checked={user.userPermission === "edit"}
              onChange={() => {
                changeUserPermission(user);
              }}
            />
          </Typography>
        </Grid>
      )}
      {checkPermissionOfEditGroup() && (
        <Grid item md={1} style={{ alignSelf: "center" }}>
          <WhiteIconButtonWithTooltip
            titleTooltip={"Cancel Invite"}
            icon={<Clear color={"secondary"} />}
            onClick={() => {
              removeUserOfGroup(user);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}
