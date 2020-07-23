import React from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";

import ListItemListCondition from "./ListItemListCondition";

export default function ListPrePostCondition({ keyList }) {
  const testCaseData = useSelector(state => state.testCaseModalReducer);

  return (
    <List
      style={{
        border: "1px solid #CBCBCB",
        width: "100%",
        borderRadius: 5,
        height: "12vh",
        overflowY: "scroll"
      }}
    >
      {testCaseData[keyList].map((precondition, index) => (
        <ListItemListCondition
          key={index}
          precondition={precondition}
          index={index}
          keyList={keyList}
        />
      ))}
    </List>
  );
}
