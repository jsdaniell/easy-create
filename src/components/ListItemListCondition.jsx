import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  ListItem,
  ListItemSecondaryAction,
  TextField
} from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export default function ListItemListCondition({
  precondition,
  index,
  keyList
}) {
  const testCaseData = useSelector(state => state.testCaseModalReducer);

  const [text, setText] = useState(precondition);

  const dispatch = useDispatch();

  return (
    <ListItem dense key={`${precondition}-${index}`}>
      <TextField
        fullWidth
        variant={"outlined"}
        value={text}
        onChange={({ target: { value } }) => {
          setText(value);
        }}
        onBlur={() => {
          if (!text) {
            let auxArray = testCaseData[keyList];

            auxArray.splice(index, 1);

            return dispatch({
              type: "SET_TEST_CASE_MODAL_REDUCER",
              payload: {
                ...testCaseData,
                [keyList]: auxArray
              }
            });
          }

          let auxArray = testCaseData[keyList];

          auxArray[index] = text;

          dispatch({
            type: "SET_TEST_CASE_MODAL_REDUCER",
            payload: {
              ...testCaseData,
              [keyList]: auxArray
            }
          });
        }}
        color={"primary"}
        size={"small"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{`${index}`}</InputAdornment>
          )
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          size={"small"}
          edge="end"
          aria-label="comments"
          onClick={() => {
            let auxArray = testCaseData[keyList];

            auxArray.splice(index, 1);

            dispatch({
              type: "SET_TEST_CASE_MODAL_REDUCER",
              payload: {
                ...testCaseData,
                [keyList]: auxArray
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
