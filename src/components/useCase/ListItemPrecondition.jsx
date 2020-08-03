import React, { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  ListItem,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import { RemoveCircle, DragIndicator } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export default function ListItemPrecondition({ precondition, index, keyList }) {
  const useCaseData = useSelector(state => state.useCaseReducer);

  const [text, setText] = useState(precondition);

  const dispatch = useDispatch();

  return (
    <ListItem dense key={`${precondition}-${index}`}>
      <DragIndicator
        style={{ paddingRight: 3, color: "rgba(000,000,000, 0.5)" }}
      />
      <TextField
        fullWidth
        variant={"outlined"}
        value={text}
        onChange={({ target: { value } }) => {
          setText(value);
        }}
        onBlur={() => {
          if (!text) {
            let auxArray = useCaseData.preconditions;

            auxArray.splice(index, 1);

            return dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: {
                ...useCaseData,
                preconditions: auxArray
              }
            });
          }

          let auxArray = useCaseData.preconditions;

          auxArray[index] = text;

          dispatch({
            type: "SET_USE_CASE_MODAL_REDUCER",
            payload: {
              ...useCaseData,
              preconditions: auxArray
            }
          });
        }}
        color={"primary"}
        size={"small"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{`${index + 1}`}</InputAdornment>
          )
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          size={"small"}
          edge="end"
          aria-label="comments"
          onClick={() => {
            let auxArray = useCaseData.preconditions;

            auxArray.splice(index, 1);

            dispatch({
              type: "SET_USE_CASE_MODAL_REDUCER",
              payload: {
                ...useCaseData,
                preconditions: auxArray
              }
            });
          }}
        >
          <RemoveCircle fontSize={"small"} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
