import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getItemStyle,
  getQuestionListStyle,
  Reorder
} from "./utilsDragAndDrop";
import { DragIndicator } from "@material-ui/icons";
import Answers from "./Sublist";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function UseCaseList() {
  const { listProcedures } = useSelector(state => state.useCaseReducer);

  const [list, setList] = useState([]);

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(result);
      const newList = Reorder(
        list,
        result.source.index,
        result.destination.index
      );

      setList(newList);
    } else {
      const answers = Reorder(
        list[parseInt(result.type, 10)].sublist,
        result.source.index,
        result.destination.index
      );

      const newList = JSON.parse(JSON.stringify(list));

      newList[result.type].answers = answers;

      setList(newList);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="QUESTIONS">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getQuestionListStyle(snapshot.isDraggingOver)}
          >
            {listProcedures.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                          defaultValue={item.content}
                          style={{ width: 300 }}
                          color={"primary"}
                          size={"small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{`${index +
                                1}`}</InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Answers num={index} item={item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
