import React from "react";
import { Grid, IconButton, Popover, TextField } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

export default function PopoverAddSome({
  anchor,
  setAnchor,
  value,
  setValue,
  addFunction
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
        style={{ padding: 8 }}
        justify={"space-between"}
      >
        <Grid item md>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            size={"small"}
            variant={"outlined"}
          ></TextField>
        </Grid>
        <Grid item md={2} style={{ textAlign: "end" }}>
          <IconButton size={"small"} onClick={() => addFunction()}>
            <AddCircleOutline color={"primary"}></AddCircleOutline>
          </IconButton>
        </Grid>
      </Grid>
    </Popover>
  );
}
