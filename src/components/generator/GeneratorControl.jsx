import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import DevicesUtils from "../../utils/deviceUtils";
import { useDispatch, useSelector } from "react-redux";
import GeneratorChipButton from "./GeneratorChipButton";
import generateByLabel from "./generateByLabel";
import { useTranslation } from "react-i18next";
import { ReactComponent as MockSvg } from "../../assets/mock.svg";

export default function GeneratorControl() {
  const dataGenerator = useSelector(state => state.dataGeneratorReducer);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  function changeStatus(l) {
    let indexToChange = dataGenerator.findIndex(item => item.label === l);

    let arrayChanged = dataGenerator;

    arrayChanged[indexToChange].status = !dataGenerator[indexToChange].status;
    arrayChanged[indexToChange].customValue = generateByLabel(l, i18n.language);

    dispatch({
      type: "SET_DATA_GENERATOR",
      payload: [...arrayChanged]
    });
  }

  useEffect(() => {
    let filled = [];

    dataGenerator.forEach(item => {
      if (item.status) {
        filled.push({
          ...item,
          customValue: generateByLabel(item.label, i18n.language)
        });
      } else {
        filled.push(item);
      }
    });
    dispatch({
      type: "SET_DATA_GENERATOR",
      payload: [...filled]
    });
  }, []);

  return (
    <Grid
      item
      container
      style={{
        padding: "0px 20px 20px",
        height: DevicesUtils.checkIfIsMobile() ? "82%" : "92%",
        alignContent: DevicesUtils.checkIfIsMobile()
          ? "normal"
          : "space-between"
      }}
      justify={"center"}
      spacing={1}
    >
      <Grid item md={12}>
        <Grid container spacing={1} justify={"flex-start"}>
          {dataGenerator.map((item, ind) => (
            <GeneratorChipButton
              label={item.label}
              status={item.status}
              setStatus={changeStatus}
            />
          ))}
        </Grid>
      </Grid>

      <Grid item md={12} style={{ textAlign: "center" }}>
        <MockSvg width={"200px"} height={"200px"} />
      </Grid>

      <Grid item md={12}>
        <Typography variant={"h5"} style={{ color: "white" }}>
          {t("generatorTitleDesc")}
        </Typography>
        <Typography
          variant={"body2"}
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {t("generateDescription")}
        </Typography>
      </Grid>
    </Grid>
  );
}
