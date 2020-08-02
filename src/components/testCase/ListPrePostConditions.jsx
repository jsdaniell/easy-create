import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import ListItemListCondition from "./ListItemListCondition";
import arrayMove from "array-move";

export default function ListPrePostCondition({ keyList }) {
  const SortableItem = SortableElement(({ value, num }) => {
    return (
      <ListItemListCondition
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

  const testCaseData = useSelector(state => state.testCaseModalReducer);

  function onSortEnd({ oldIndex, newIndex }) {
    dispatch({
      type: "SET_TEST_CASE_MODAL_REDUCER",
      payload: {
        ...testCaseData,
        [keyList]: arrayMove(testCaseData[keyList], oldIndex, newIndex)
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
      <SortableList
        items={testCaseData[keyList]}
        onSortEnd={onSortEnd}
        distance={1}
      />
    </List>
  );
}
