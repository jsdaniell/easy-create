import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import GeneratorField from "./GeneratorField";
import generateByLabel from "./generateByLabel";
import { useTranslation } from "react-i18next";

export default function GeneratorView() {
  const dataGenerator = useSelector(state => state.dataGeneratorReducer);

  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  function generateNew(l) {
    let indexToChange = dataGenerator.findIndex(item => item.label === l);

    let arrayChanged = dataGenerator;

    arrayChanged[indexToChange].customValue = generateByLabel(l, i18n.language);

    dispatch({
      type: "SET_DATA_GENERATOR",
      payload: [...arrayChanged]
    });
  }

  return (
    <Grid
      container
      style={{
        padding: "25px 50px",
        alignContent: "flex-start",
        minHeight: "100%"
      }}
      justify={"center"}
      spacing={2}
    >
      <Grid item md={12} style={{ textAlign: "center" }}>
        <Typography variant={"h5"}>Data Generator</Typography>
      </Grid>

      <Grid
        item
        container
        md={12}
        spacing={1}
        style={{ maxHeight: "75vh", overflowY: "scroll" }}
      >
        {dataGenerator
          .filter(i => i.status)
          .map((item, index) => (
            <GeneratorField
              label={item.label}
              generate={item.generate}
              formatting={item.format}
              value={item.customValue}
              generateNew={generateNew}
            />
          ))}
      </Grid>
    </Grid>
  );
}
