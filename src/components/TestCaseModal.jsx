import React from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Add, RemoveCircle, FiberManualRecord } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

export default function TestCaseModal() {
  const testCaseData = useSelector(state => state.testCaseModalReducer);

  return (
    <Grid
      container
      style={{ padding: "25px 50px", alignContent: "space-between" }}
      spacing={2}
    >
      <Grid item md={12} container justify={"center"}>
        <TextField
          placeholder={"Write the title"}
          inputProps={{ style: { textAlign: "center" } }}
        />
      </Grid>
      <Grid item container justify={"space-between"} spacing={2}>
        <Grid item md>
          <TextField
            variant={"outlined"}
            fullWidth
            label={"ID"}
            size={"small"}
          />
        </Grid>
        <Grid item md>
          <TextField
            variant={"outlined"}
            fullWidth
            label={"Environment"}
            size={"small"}
          />
        </Grid>
        <Grid item style={{ textAlign: "end" }}>
          <ToggleButtonGroup
            value={"center"}
            size={"small"}
            exclusive
            onChange={() => {}}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <FiberManualRecord color={"#EBD877"} />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <FiberManualRecord color={"#7ABF6C"} />
            </ToggleButton>
            <ToggleButton
              value="right"
              color={"#F17878"}
              aria-label="right aligned"
            >
              <FiberManualRecord />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <Grid item container justify={"space-between"} spacing={2}>
        <Grid item md={8}>
          <TextField
            variant={"outlined"}
            fullWidth
            label={"Name"}
            size={"small"}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            variant={"outlined"}
            fullWidth
            label={"Actor"}
            size={"small"}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify={"flex-start"}
        spacing={2}
        alignItems={"center"}
      >
        <Grid item>
          <Typography color={"primary"}>Preconditions</Typography>
        </Grid>
        <Grid item>
          <IconButton
            size={"small"}
            style={{ backgroundColor: "#262A43" }}
            color={"secondary"}
            onClick={() => console.log("Click")}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container>
        <List
          style={{
            border: "1px solid #CBCBCB",
            width: "100%",
            borderRadius: 5,
            height: "15vh",
            overflowY: "scroll"
          }}
        >
          <ListItem dense button>
            <ListItemText primary={`Line item 1`} />
            <ListItemSecondaryAction>
              <IconButton size={"small"} edge="end" aria-label="comments">
                <RemoveCircle fontSize={"small"} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>

      <Grid
        item
        container
        justify={"flex-start"}
        spacing={2}
        alignItems={"center"}
      >
        <Grid item>
          <Typography color={"primary"}>Procedures</Typography>
        </Grid>
        <Grid item>
          <IconButton
            size={"small"}
            style={{ backgroundColor: "#262A43" }}
            color={"secondary"}
            onClick={() => console.log("Click")}
          >
            <Add fontSize={"small"} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container>
        <List
          style={{
            border: "1px solid #CBCBCB",
            width: "100%",
            borderRadius: 5,
            height: "18vh",
            overflowY: "scroll"
          }}
        >
          <ListItem dense button>
            <ListItemText primary={`Line item 1`} />
            <ListItemSecondaryAction>
              <IconButton size={"small"} edge="end" aria-label="comments">
                <RemoveCircle fontSize={"small"} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>

      <Grid item container>
        <TextField
          variant={"outlined"}
          fullWidth
          label={"Post-condition"}
          size={"small"}
        />
      </Grid>

      <Grid item container justify={"flex-end"} spacing={2}>
        <Grid item>
          <Button color={"primary"}>EXPORT</Button>
        </Grid>
        <Grid item>
          <Button color={"primary"}>SAVE</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
