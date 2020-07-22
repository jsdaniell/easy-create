import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import testCaseModalReducer from "./testCaseModalReducer";

const rootPersistConfig = {
  key: "root",
  storage: storage
};

const rootReducer = combineReducers({
  testCaseModalReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
