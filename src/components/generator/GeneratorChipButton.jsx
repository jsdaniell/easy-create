import React from "react";
import { Chip, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export default function GeneratorChipButton({ setStatus, label, status }) {
  const { t } = useTranslation();

  return (
    <Grid item>
      <Chip
        label={t(label)}
        variant={!status ? "outlined" : "default"}
        clickable
        color={"secondary"}
        onClick={() => setStatus(label)}
      />
    </Grid>
  );
}
