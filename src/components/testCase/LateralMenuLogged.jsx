import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";
import { getTestsGroups } from "../../database/testCaseQueries/getTestsGroups";
import { useSelector } from "react-redux";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  const [groups, setGroups] = useState([]);

  const [selectedGroup, setSelectedGroup] = useState();

  const userLogged = useSelector(state => state.userUidReducer);

  useEffect(() => {
    getTestsGroups({
      user: userLogged,
      setState: data => {
        setGroups(data);

        setSelectedGroup(data[0].itemId);
      }
    });
  }, []);

  return (
    <Grid
      item
      container
      style={{ padding: "0px 20px 20px" }}
      justify={"space-between"}
    >
      <Grid item md={12} xs={12}>
        <TextField
          id="standard-select-currency"
          select
          variant={"outlined"}
          fullWidth
          color={"secondary"}
          size={"small"}
          label={t("groupsLabel")}
          defaultValue={`default`}
        >
          {groups.map(option => (
            <MenuItem key={option.itemId} value={option.itemId}>
              {option.itemLabel}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item md={12} xs={12} style={{ height: "100%" }}></Grid>
    </Grid>
  );
}
