import { put, takeLatest, call } from 'redux-saga/effects';
import uploadPhoto from '../services/uploadPhoto';

import {
  fetchImageStart,
  fetchImageSuccess,
  fetchImageError,
  setSecondStep,
} from './profileWizardSlice';

function* setSecondStepAsync({
  payload: { profilePhoto, description },
}: ReturnType<typeof setSecondStep>) {
  yield put(fetchImageStart());

  try {
    const profilePhotoUrl = yield call(uploadPhoto, profilePhoto);

    yield put(
      fetchImageSuccess({ profilePhoto, description, profilePhotoUrl }),
    );
  } catch {
    yield put(
      fetchImageError('Something went wrong while uploading the photo'),
    );
  }
}

export default function* watchProfileWizard() {
  yield takeLatest(setSecondStep.toString(), setSecondStepAsync);
}
