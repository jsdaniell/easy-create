import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import DevicesUtils from "../../utils/deviceUtils";
import { getTestsGroups } from "../../database/testCaseQueries/getTestsGroups";
import { useDispatch, useSelector } from "react-redux";
import { getDocumentsFromTestsGroup } from "../../database/testCaseQueries/getDocumentsFromTestsGroup";
import TestListItem from "./TestListItem";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

export default function LateralMenuLogged() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [selectedGroup, setSelectedGroup] = useState();

  const userLogged = useSelector(state => state.userUidReducer);

  const testList = useSelector(state => state.testListDocsReducer);
  const testsGroups = useSelector(state => state.testGroupsReducer);

  useEffect(() => {
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
  }, []);

  function navigate(nextOrBefore) {
    if (testList.length) {
      getDocumentsFromTestsGroup({
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
      });
    }
  }

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
        alignContent: "space-between"
      }}
      justify={"space-between"}
      spacing={2}
    >
      <Grid container spacing={1} style={{ padding: 8 }} md={12} xs={12}>
        <Grid item md={4}>
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
            {testsGroups.list.map(option => (
              <MenuItem key={option.itemId} value={option.itemId}>
                {option.itemLabel}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item container md={12} xs={12}>
          {testList.map((doc, index) => (
            <TestListItem test={doc} />
          ))}
        </Grid>
      </Grid>

      <Grid item md={12}>
        <Grid container justify={"flex-end"}>
          <Grid item>
            <IconButton size={"small"} onClick={() => navigate("before")}>
              <NavigateBefore color={"secondary"}></NavigateBefore>
            </IconButton>
          </Grid>
          <Typography style={{ color: "white" }}>...</Typography>
          <Grid item>
            <IconButton size={"small"} onClick={() => navigate("next")}>
              <NavigateNext color={"secondary"}></NavigateNext>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
