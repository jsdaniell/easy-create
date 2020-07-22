import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from './reducers/index';

export default () => {
  let store = createStore(persistedReducer);
  let storePersist = persistStore(store);
  return { store, storePersist };
};
