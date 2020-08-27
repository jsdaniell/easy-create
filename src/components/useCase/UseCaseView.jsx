import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import UseCaseList from "./UseCaseList";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ListPreConditions from "./ListPrecondition";
import { Add } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import exportOnPdfUseCase from "../../utils/exportOnPdfUseCase";
import {addingDocumentOnGroup} from "../../service/groupsServices";

export default function UseCaseView() {
  const isMobile = DevicesUtils.checkIfIsMobile();

  const { t } = useTranslation();

  const useCaseRedux = useSelector(state => state.useCaseReducer);


  const useCaseGroups = useSelector(state => state.useCaseGroupsReducer);

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);

    const {
      selected: { docId }
    } = useCaseGroups;

    await addingDocumentOnGroup({
      type: "useCasesGroups",
      idGroup: docId,
      data: useCaseRedux,
      success: data => {
        dispatch({
          type: "SET_USE_CASE_LIST_DOCS",
          payload: data
        });
        setLoading(false);
      },
      catchError: err => {
        enqueueSnackbar(err, {
          variant: "error"
        });
        setLoading(false);
      }
    });
  }


  function handleExport() {
    if (!useCaseRedux.title) {
      return enqueueSnackbar(t("mandatoryTitleErrorMessage"), {
        variant: "warning"
      });
    }

    if (!useCaseRedux.preconditions.length) {
      return enqueueSnackbar(t("addPreconditionsErrorMessage"), {
        variant: "warning"
      });
    }

    if (!useCaseRedux.listProcedures.length) {
      return enqueueSnackbar(t("addSomeProceduresErrorMessage"), {
        variant: "warning"
      });
    }

    exportOnPdfUseCase(useCaseRedux);
  }

  return (
    <Grid
      container
      style={{
        padding: isMobile ? "25px 25px" : "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={2}
    >
      <Grid item md={12} container justify={"center"}>
        <TextField
          placeholder={t("writeTitleLabel")}
          value={useCaseRedux.title}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: { ...useCaseRedux, title: value }
            });
          }}
        />
      </Grid>

      <Grid item md xs={12}>
        <TextField
          variant={"outlined"}
          fullWidth
          value={useCaseRedux.id}
          label={"ID"}
          size={"small"}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: { ...useCaseRedux, id: value }
            });
          }}
        />
      </Grid>
      <Grid item md xs={12}>
        <TextField
          variant={"outlined"}
          fullWidth
          value={useCaseRedux.scenario}
          label={t("scenarioLabel")}
          size={"small"}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: { ...useCaseRedux, scenario: value }
            });
          }}
        />
      </Grid>
      <Grid item md xs={12}>
        <TextField
          variant={"outlined"}
          fullWidth
          value={useCaseRedux.actor}
          label={t("actorLabel")}
          size={"small"}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: { ...useCaseRedux, actor: value }
            });
          }}
        />
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
              let newArray = useCaseRedux.preconditions;

              if (newArray.length && !newArray[newArray.length - 1]) {
                return enqueueSnackbar(t("fillLastOptionErrorMessage"), {
                  variant: "warning"
                });
              }

              newArray.push("");

              dispatch({
                type: "SET_USE_CASE_MODAL_REDUCER",
                payload: {
                  ...useCaseRedux,
                  preconditions: newArray
                }
              });
            }}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item md={12}>
        <ListPreConditions />
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
          <Typography color={"primary"}>{t("stepsLabel")}</Typography>
        </Grid>

        <Grid item>
          <IconButton
            size={"small"}
            style={{ backgroundColor: "#262A43" }}
            color={"secondary"}
            onClick={() => {
              let newArray = useCaseRedux.listProcedures;

              if (newArray.length && !newArray[newArray.length - 1].content) {
                return enqueueSnackbar(t("fillLastOptionErrorMessage"), {
                  variant: "warning"
                });
              }

              newArray.push({
                id: `list-${newArray.length + 1}`,
                content: ``,
                sublist: []
              });

              dispatch({
                type: "SET_USE_CASE_MODAL_REDUCER",
                payload: {
                  ...useCaseRedux,
                  listProcedures: newArray
                }
              });
            }}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item md={12} style={{ minHeight: 156 }}>
        <UseCaseList />
      </Grid>

      <Grid item container xs={12}>
        <TextField
          variant={"outlined"}
          fullWidth
          value={useCaseRedux.postcondition}
          label={t("postConditionLabel")}
          size={"small"}
          onChange={({ target: { value } }) => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: { ...useCaseRedux, postcondition: value }
            });
          }}
        />
      </Grid>

      <Grid
        item
        container
        justify={isMobile ? "center" : "flex-end"}
        spacing={2}
      >
        <Grid item md style={{ maxHeight: 1 }}>
          <Grid item>{loading && <CircularProgress color={"primary"} />}</Grid>
        </Grid>
        <Grid
          item
          md={2}
          xs
          onClick={() => {
            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: {
                title: "",
                actor: "",
                id: "",
                scenario: "",

                listProcedures: [],
                preconditions: [],
                postcondition: ""
              }
            });
          }}
        >
          <Button color={"primary"}>{t("resetLabel")}</Button>
        </Grid>
        <Grid item xs md={2}>
          <Button color={"primary"} onClick={() => handleExport()}>
            {t("exportLabel").toUpperCase()}
          </Button>
        </Grid>

        <Grid item xs md={2}>
          <Button color={"primary"} onClick={() => save()}>
            {t("saveLabel").toUpperCase()}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
