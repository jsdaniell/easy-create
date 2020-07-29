import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Chip
} from "@material-ui/core";
import { Company, Form } from "brazil-mocker";
import {
  FileCopyOutlined,
  RotateLeftOutlined,
  FormatQuote
} from "@material-ui/icons";
import copy from "copy-to-clipboard";
import format from "@jsdaniell/mask-fields";
import { useTranslation } from "react-i18next";
import Faker from "faker";
import { useSelector } from "react-redux";
import DevicesUtils from "../../utils/deviceUtils";

export default function GeneratorField({
  label,
  formatting,
  value,
  generateNew
}) {
  const [formatted, setFormatted] = useState(false);

  function formatUSNumber(entry = "") {
    const match = entry
      .replace(/\D+/g, "")
      .replace(/^1/, "")
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
    return `${part1}${part2}${part3}`;
  }

  const { t, i18n } = useTranslation();

  function formatByLabel(label, val) {
    switch (label) {
      case "cpf":
        return format.cpf(val);
      case "cnpj":
        return format.cnpj(val);
      case "phoneNumber":
        return i18n.language === "en" ? formatUSNumber(val) : format.tel(val);
      case "RG":
        return format.rg(val);
      default:
        return val;
    }
  }

  return (
    <Grid item md={12}>
      <Grid
        container
        spacing={1}
        style={{
          alignItems: "center",
          justifyContent: DevicesUtils.checkIfIsMobile() ? "space-evenly" : null
        }}
      >
        <Grid item>
          <Chip style={{ opacity: 0.85 }} color={"primary"} label={t(label)} />
        </Grid>

        {!DevicesUtils.checkIfIsMobile() && (
          <Grid item md>
            <hr style={{ color: "#262A43" }}></hr>
          </Grid>
        )}

        {formatting && (
          <Grid item>
            <Tooltip title={"Formatted"}>
              <IconButton
                style={{
                  boxShadow: !formatted ? "inset 0px 0px 0px 2px #262A43" : null
                }}
                onClick={() => setFormatted(!formatted)}
              >
                <FormatQuote color={"primary"} fontSize={"small"} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}

        <Grid item>
          <Tooltip title={"Copy to Clipboard"}>
            <IconButton onClick={() => copy(value)}>
              <FileCopyOutlined color={"primary"} fontSize={"small"} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={"Generate Other"}>
            <IconButton onClick={() => generateNew(label)}>
              <RotateLeftOutlined color={"primary"} fontSize={"small"} />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item md={4} xs={12}>
          <Tooltip title={value}>
            <TextField
              disabled
              variant={"outlined"}
              fullWidth
              value={!formatted ? formatByLabel(label, value) : value}
              size={"small"}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}
