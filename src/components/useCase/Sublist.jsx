import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "./utilsDragAndDrop";
import { DragIndicator } from "@material-ui/icons";
import { Grid, InputAdornment, TextField } from "@material-ui/core";

const Answers = props => {
  const { item, num } = props;
  return (
    <Droppable droppableId={`droppable${item.id}`} type={`${num}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {item.sublist.map((subitem, index) => {
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
                    <Grid container justify={"flex-start"}>
                      <Grid item style={{ alignSelf: "center" }}>
                        <span {...provided.dragHandleProps}>
                          <DragIndicator
                            style={{ color: "rgba(000,000,000, 0.5)" }}
                          />
                        </span>
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <TextField
                          variant={"outlined"}
                          style={{ width: 300 }}
                          defaultValue={subitem}
                          color={"primary"}
                          size={"small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{`${num +
                                1}.${index + 1}`}</InputAdornment>
                            )
                          }}
                        />
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
