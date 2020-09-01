import { all } from 'redux-saga/effects';

import profileWizardWatcher from '../routes/ProfileWizard/state/profileWizardSaga';

export default function* rootSaga() {
  yield all([profileWizardWatcher()]);
}
