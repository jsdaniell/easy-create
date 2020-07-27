import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";

export default function WhiteIconButtonWithTooltip({
  titleTooltip,
  icon,
  onClick
}) {
  return (
    <Tooltip title={titleTooltip}>
      <IconButton
        size={"small"}
        onClick={event => {
          onClick(event);
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
