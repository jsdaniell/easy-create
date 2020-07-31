import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import arrayMove from "array-move";
import ListItemPrecondition from "./ListItemPrecondition";

export default function ListPreConditions({ keyList }) {
  const SortableItem = SortableElement(({ value, num }) => {
    return (
      <ListItemPrecondition
        key={num}
        precondition={value}
        index={num}
        keyList={keyList}
      />
    );
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value}`}
            index={index}
            num={index}
            value={value}
          />
        ))}
      </div>
    );
  });

  const dispatch = useDispatch();

  const useCaseData = useSelector(state => state.useCaseReducer);

  function onSortEnd({ oldIndex, newIndex }) {
    dispatch({
      type: "SET_USE_CASE_MODAL_REDUCER",
      payload: {
        ...useCaseData,
        preconditions: arrayMove(useCaseData.preconditions, oldIndex, newIndex)
      }
    });
  }

  return (
    <List
      style={{
        border: "1px solid #CBCBCB",
        width: "100%",
        borderRadius: 5,
        height: "89px",
        overflowY: "scroll"
      }}
    >
      <SortableList items={useCaseData.preconditions} onSortEnd={onSortEnd} />
    </List>
  );
}
