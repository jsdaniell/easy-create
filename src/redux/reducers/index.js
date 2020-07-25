import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import testCaseModalReducer from "./testCaseModalReducer";
import userUidReducer from "./userUidReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage
};

const rootReducer = combineReducers({
  testCaseModalReducer,
  userUidReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
