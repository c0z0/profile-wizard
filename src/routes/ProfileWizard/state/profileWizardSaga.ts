import { put, takeLatest, call, delay } from 'redux-saga/effects';
import uploadPhoto from '../services/uploadPhoto';

import {
  fetchImageStart,
  fetchImageSuccess,
  fetchImageError,
  setSecondStep,
  confirm,
  confirmStart,
  confirmSuccess,
  confirmError,
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

function* confirmAsync({ payload }: ReturnType<typeof confirm>) {
  yield put(confirmStart());

  try {
    console.log(payload);

    // this should be replaced by an api call
    yield delay(1000);

    yield put(confirmSuccess());
  } catch {
    yield put(confirmError('Something went wrong while saving your profile'));
  }
}

export default function* watchProfileWizard() {
  yield takeLatest(setSecondStep.toString(), setSecondStepAsync);
  yield takeLatest(confirm.toString(), confirmAsync);
}
