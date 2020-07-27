import React from "react";
import { Grid, Popover } from "@material-ui/core";
import { DoneOutlineRounded, Cancel } from "@material-ui/icons";
import WhiteIconButtonWithTooltip from "./WhiteIconButtonWithTooltip";
import refuseAnInvite from "../../database/testCaseQueries/refuseAnInvite";
import { acceptingAnInvite } from "../../database/testCaseQueries/acceptingAnInvite";

export default function PopoverNotificationList({
  anchor,
  setAnchor,
  invites,
  userLogged,
  setState
}) {
  function refusing(invite) {
    refuseAnInvite({ user: userLogged, invite, setState });
  }

  function accepting(invite) {
    console.log("invite: ", invite);

    acceptingAnInvite({ invite, user: userLogged, setState });
  }

  return (
    <Popover
      open={Boolean(anchor)}
      anchorEl={anchor}
      onClose={() => setAnchor(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Grid
        container
        alignItems={"center"}
        style={{ padding: 8, maxWidth: 350 }}
        justify={"center"}
      >
        {invites &&
          invites.map((item, inde) => (
            <Grid
              item
              container
              md={12}
              xs={12}
              style={{
                padding: 8,
                borderRadius: 5,
                border: "1px solid #262A43"
              }}
              spacing={1}
            >
              <Grid item md>
                {item.message}
              </Grid>
              <Grid item md={2} style={{ textAlign: "center" }}>
                <WhiteIconButtonWithTooltip
                  onClick={() => {
                    accepting(item);
                  }}
                  icon={<DoneOutlineRounded color={"primary"} />}
                  titleTooltip={"Accept"}
                />
              </Grid>
              <Grid item md={2} style={{ textAlign: "center" }}>
                <WhiteIconButtonWithTooltip
                  icon={<Cancel color={"primary"} />}
                  titleTooltip={"Decline"}
                  onClick={() => {
                    refusing(item);
                  }}
                />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Popover>
  );
}
