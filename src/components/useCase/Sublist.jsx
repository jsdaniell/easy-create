import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "./utilsDragAndDrop";
import { DragIndicator, HighlightOffRounded } from "@material-ui/icons";
import { Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    color: "#262A43",
    "&:before": {
      // normal
      color: "#262A43"
    },
    "&:after": {
      // focused
      color: "#262A43"
    }
  },
  inputLabel: {
    color: "lightgray",
    "&.focused": {
      color: "lightgray"
    }
  }
});

const Answers = props => {
  const { item, num, changeValueSubItem, removeSubItem } = props;

  const classes = useStyles();

  return (
    <Droppable droppableId={`droppable${item.id}`} type={`${num}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {item.sublist.map((subItem, index) => {
            return (
              <Draggable
                key={`${num}${index}`}
                draggableId={`${num}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <Grid container justify={"center"}>
                      <Grid item style={{ alignSelf: "center" }}>
                        <span {...provided.dragHandleProps}>
                          <DragIndicator
                            style={{ color: "rgba(000,000,000, 0.5)" }}
                          />
                        </span>
                      </Grid>
                      <Grid item md style={{ alignSelf: "center" }}>
                        <TextField
                          variant={"outlined"}
                          fullWidth
                          value={subItem}
                          label={!index ? "Alternative Flow" : null}
                          color={"primary"}
                          onChange={e => {
                            changeValueSubItem(num, index, e.target.value);
                          }}
                          size={"small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{`${num +
                                1}.${index + 1}`}</InputAdornment>
                            )
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.inputLabel,
                              focused: "focused"
                            }
                          }}
                        />
                      </Grid>
                      <Grid item md={1} style={{ alignSelf: "center" }}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => removeSubItem(num, index)}
                        >
                          <HighlightOffRounded />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Answers;
