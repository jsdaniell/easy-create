import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  getItemStyle,
  getQuestionListStyle,
  Reorder
} from "./utilsDragAndDrop";
import {
  DragIndicator,
  PlaylistAdd,
  AccountTreeRounded,
    HighlightOffRounded
} from "@material-ui/icons";
import Answers from "./Sublist";
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

export default function UseCaseList() {
  const useCaseRedux = useSelector(state => state.useCaseReducer);

  const dispatch = useDispatch();

  function onDragEnd(result) {
    console.log(result);

    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(result);
      const newList = Reorder(
        useCaseRedux.listProcedures,
        result.source.index,
        result.destination.index
      );

      dispatch({
        type: "SET_USE_CASE_MODAL_REDUCER",
        payload: {
          ...useCaseRedux,
          listProcedures: newList
        }
      });
    } else {
      const answers = Reorder(
        useCaseRedux.listProcedures[parseInt(result.type, 10)].sublist,
        result.source.index,
        result.destination.index
      );

      console.log(answers);

      const newList = JSON.parse(JSON.stringify(useCaseRedux.listProcedures));

      newList[result.type].sublist = answers;

      console.log("NEW", newList);

      dispatch({
        type: "SET_USE_CASE_MODAL_REDUCER",
        payload: {
          ...useCaseRedux,
          listProcedures: newList
        }
      });
    }
  }

  function dispatchList(newList) {
    dispatch({
      type: "SET_USE_CASE_MODAL_REDUCER",
      payload: {
        ...useCaseRedux,
        listProcedures: newList
      }
    });
  }

  function addItem() {
    let list = useCaseRedux.listProcedures;

    list.push({
      id: `list-${list.length + 1}`,
      content: ``,
      sublist: []
    });

    dispatchList(list);
  }

  function addSubItem(indexItem) {
    let list = useCaseRedux.listProcedures;

    list[indexItem].sublist.push("");

    dispatchList(list);
  }

  function changeValueItem(indexItem, value) {
    let list = useCaseRedux.listProcedures;

    list[indexItem].content = value;

    dispatchList(list);
  }

  function changeValueSubItem(indexItem, indexSubItem, value) {
    let list = useCaseRedux.listProcedures;

    list[indexItem].sublist[indexSubItem] = value;

    dispatchList(list);
  }

  function removeItem(indexItem) {
    let list = useCaseRedux.listProcedures;

    list.splice(indexItem, 1);

    dispatchList(list);
  }

  function removeSubItem(indexItem, indexSubItem) {
    let list = useCaseRedux.listProcedures;

    list[indexItem].sublist.splice(indexSubItem, 1);

    dispatchList(list);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="QUESTIONS">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getQuestionListStyle(snapshot.isDraggingOver)}
          >
            {useCaseRedux.listProcedures.map((item, index) => (
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
                          style={{ width: 300, paddingRight: 5 }}
                          color={"primary"}
                          onChange={e => {
                            changeValueItem(index, e.target.value);
                          }}
                          size={"small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">{`${index +
                                1}`}</InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => addItem()}
                        >
                          <PlaylistAdd />
                        </IconButton>
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => addSubItem(index)}
                        >
                          <AccountTreeRounded />
                        </IconButton>
                      </Grid>
                      <Grid item style={{ alignSelf: "center" }}>
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => removeItem(index)}
                        >
                          <HighlightOffRounded />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <Answers
                      num={index}
                      item={item}
                      changeValueSubItem={changeValueSubItem}
                      removeSubItem={removeSubItem}
                    />
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
