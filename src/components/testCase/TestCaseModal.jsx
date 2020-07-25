import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { Add, RemoveCircle, FiberManualRecord } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import ListPrePostCondition from "./ListPrePostConditions";
import { useSnackbar } from "notistack";
import exportOnPdf from "../../utils/exportOnPdf";
import DevicesUtils from "../../utils/deviceUtils";
import { useTranslation } from "react-i18next";
import { savingNewTest } from "../../database/testCaseQueries/savingNew";
import { getDocumentsFromTestsGroup } from "../../database/testCaseQueries/getDocumentsFromTestsGroup";

export default function TestCaseModal() {
  const testCaseData = useSelector(state => state.testCaseModalReducer);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const userLogged = useSelector(state => state.userUidReducer);
  const testsGroups = useSelector(state => state.testGroupsReducer);

  useEffect(() => {
    dispatch({
      type: "SET_TEST_CASE_MODAL_REDUCER",
      payload: {
        title: "",
        id: "",
        environment: "",
        priority: "",
        name: "",
        actor: "",
        preconditions: [],
        procedures: [],
        postcondition: ""
      }
    });
  }, []);

  function handleExport() {
    if (!testCaseData.title) {
      return enqueueSnackbar(t("mandatoryTitleErrorMessage"), {
        variant: "warning"
      });
    }

    if (!testCaseData.preconditions.length) {
      return enqueueSnackbar(t("addPreconditionsErrorMessage"), {
        variant: "warning"
      });
    }

    if (!testCaseData.procedures.length) {
      return enqueueSnackbar(t("addSomeProceduresErrorMessage"), {
        variant: "warning"
      });
    }

    exportOnPdf(testCaseData);
  }

  function handleSaveOnFirebase() {
    savingNewTest({
      group: testsGroups.selected,
      test: testCaseData,
      user: userLogged,
      errorAlreadyExists: () => {
        return enqueueSnackbar(t("alreadyExists"), {
          variant: "warning"
        });
      },
      success: () => {
        getDocumentsFromTestsGroup({
          user: userLogged,
          testGroupId: testsGroups.selected,
          setState: data => {
            dispatch({
              type: "SET_LIST_DOCS",
              payload: data
            });
          }
        });
      }
    });
  }

  return (
    <Grid
      container
      style={{
        padding: "25px 50px",
        alignContent: "space-between",
        minHeight: "100%"
      }}
      spacing={2}
    >
      <Grid item md={12} container justify={"center"}>
        <TextField
          placeholder={t("writeTitleLabel")}
          value={testCaseData.title}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_TEST_CASE_MODAL_REDUCER",
              payload: { ...testCaseData, title: value }
            });
          }}
        />
      </Grid>
      <Grid item container justify={"space-between"} spacing={2}>
        <Grid item md xs={12}>
          <TextField
            variant={"outlined"}
            fullWidth
            value={testCaseData.id}
            label={"ID"}
            size={"small"}
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: { ...testCaseData, id: value }
              });
            }}
          />
        </Grid>
        <Grid item md xs={12}>
          <TextField
            variant={"outlined"}
            fullWidth
            value={testCaseData.environment}
            label={t("environmentLabel")}
            size={"small"}
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: { ...testCaseData, environment: value }
              });
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md
          style={{
            textAlign: DevicesUtils.checkIfIsMobile() ? "center" : "end"
          }}
        >
          <ToggleButtonGroup
            value={testCaseData.priority}
            size={"small"}
            exclusive
            onChange={(event, newValue) => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: { ...testCaseData, priority: newValue }
              });
            }}
            aria-label="text alignment"
          >
            <ToggleButton value="1" aria-label="left aligned">
              <FiberManualRecord style={{ color: "#74CC00" }} />
            </ToggleButton>
            <ToggleButton value="2" aria-label="centered">
              <FiberManualRecord style={{ color: "#FFD400" }} />
            </ToggleButton>
            <ToggleButton value="3" aria-label="right aligned">
              <FiberManualRecord style={{ color: "#FF7102" }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Grid item container justify={"space-between"} spacing={2}>
        <Grid item md={8} xs={12}>
          <TextField
            variant={"outlined"}
            fullWidth
            value={testCaseData.name}
            label={t("nameLabel")}
            size={"small"}
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: { ...testCaseData, name: value }
              });
            }}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            variant={"outlined"}
            fullWidth
            value={testCaseData.actor}
            label={t("actorLabel")}
            size={"small"}
            onChange={({ target: { value } }) => {
              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: { ...testCaseData, actor: value }
              });
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify={"flex-start"}
        spacing={2}
        alignItems={"center"}
        xs={12}
      >
        <Grid item>
          <Typography color={"primary"}>{t("preConditionsLabel")}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            size={"small"}
            style={{ backgroundColor: "#262A43" }}
            color={"secondary"}
            onClick={() => {
              let newArray = testCaseData.preconditions;

              if (newArray.length && !newArray[newArray.length - 1]) {
                return enqueueSnackbar(t("fillLastOptionErrorMessage"), {
                  variant: "warning"
                });
              }

              newArray.push("");

              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: {
                  ...testCaseData,
                  preconditions: newArray
                }
              });
            }}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container style={{ flexGrow: 1 }} xs={12}>
        <ListPrePostCondition keyList={"preconditions"} />
      </Grid>

      <Grid
        item
        container
        justify={"flex-start"}
        spacing={2}
        alignItems={"center"}
        xs={12}
      >
        <Grid item>
          <Typography color={"primary"}>{t("proceduresLabel")}</Typography>
        </Grid>
        <Grid item>
          <IconButton
            size={"small"}
            style={{ backgroundColor: "#262A43" }}
            color={"secondary"}
            onClick={() => {
              let newArray = testCaseData.procedures;

              if (newArray.length && !newArray[newArray.length - 1]) {
                return enqueueSnackbar(t("fillLastOptionErrorMessage"), {
                  variant: "warning"
                });
              }

              newArray.push("");

              dispatch({
                type: "SET_TEST_CASE_MODAL_REDUCER",
                payload: {
                  ...testCaseData,
                  procedures: newArray
                }
              });
            }}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container xs={12}>
        <ListPrePostCondition keyList={"procedures"} />
      </Grid>

      <Grid item container xs={12}>
        <TextField
          variant={"outlined"}
          fullWidth
          value={testCaseData.postcondition}
          label={t("postConditionLabel")}
          size={"small"}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_TEST_CASE_MODAL_REDUCER",
              payload: { ...testCaseData, postcondition: value }
            });
          }}
        />
      </Grid>

      <Grid item container justify={"flex-end"} spacing={2}>
        <Grid
          item
          onClick={() => {
            dispatch({
              type: "SET_TEST_CASE_MODAL_REDUCER",
              payload: {
                title: "",
                id: "",
                environment: "",
                priority: "",
                name: "",
                actor: "",
                preconditions: [],
                procedures: [],
                postcondition: ""
              }
            });
          }}
        >
          <Button color={"primary"}>{t("resetLabel")}</Button>
        </Grid>
        <Grid item>
          <Button color={"primary"} onClick={() => handleExport()}>
            {t("exportLabel").toUpperCase()}
          </Button>
        </Grid>
        {userLogged && (
          <Grid item>
            <Button color={"primary"} onClick={() => handleSaveOnFirebase()}>
              {t("saveLabel").toUpperCase()}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
