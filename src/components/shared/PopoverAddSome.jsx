import React from "react";
import {
  Grid,
  IconButton,
  Popover,
  TextField,
  Switch,
  Typography
} from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

export default function PopoverAddSome({
  anchor,
  setAnchor,
  value,
  setValue,
  addFunction,
  label,
  permissible,
  permission,
  setPermission,
  permissionLabel
}) {
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
        style={{ padding: 8, maxWidth: 250 }}
        justify={"space-between"}
      >
        <Grid item md>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            size={"small"}
            label={label || false}
            variant={"outlined"}
          />
        </Grid>
        <Grid item md={2} style={{ textAlign: "end" }}>
          <IconButton size={"small"} onClick={() => addFunction()}>
            <AddCircleOutline color={"primary"}></AddCircleOutline>
          </IconButton>
        </Grid>
        {permissible && (
          <Grid
            item
            container
            md={12}
            xs={12}
            style={{ textAlign: "start", alignItems: "center" }}
          >
            <Grid item md style={{ paddingLeft: 4 }}>
              <Typography>{permissionLabel}</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={permission}
                onChange={setPermission}
                color={"primary"}
                name="checkedA"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Popover>
  );
}
