import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import { reducer as profileWizard } from '../components/ProfileWizard/state/profileWizardSlice';

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const reducer = combineReducers({ profileWizard });

  const store = configureStore({ reducer, middleware: [sagaMiddleware] });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
