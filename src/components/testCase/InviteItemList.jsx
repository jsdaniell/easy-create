import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { AccountCircle, Clear } from "@material-ui/icons";
import WhiteIconButtonWithTooltip from "../shared/WhiteIconButtonWithTooltip";

export default function InviteItemList({ item, cancelInvite }) {
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
        <Typography style={{ color: "white" }}>{item.toEmail}</Typography>
      </Grid>
      <Grid item style={{ alignItems: "center" }}>
        <Typography
          variant={"subtitle2"}
          style={{ color: "white", paddingTop: 4 }}
        >
          {item.status}
        </Typography>
      </Grid>
      <Grid item md={1}>
        <WhiteIconButtonWithTooltip
          titleTooltip={"Cancel Invite"}
          icon={<Clear color={"secondary"} />}
          onClick={() => {
            cancelInvite(item);
          }}
        />
      </Grid>
    </Grid>
  );
}
