import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import testCaseModalReducer from "./testCaseModalReducer";
import userUidReducer from "./userUidReducer";
import testListDocsReducer from "./testListDocsReducer";
import testGroupsReducer from "./testGroupsReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  testCaseModalReducer,
  userUidReducer,
  testListDocsReducer,
  testGroupsReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
