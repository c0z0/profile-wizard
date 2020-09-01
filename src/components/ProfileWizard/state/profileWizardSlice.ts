import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

export type ProfileWizardSlice = {
  name: string;
  email: string;
  password: string;
  profilePhoto: File | null;
  profilePhotoUrl: string;
  description: string;
  fetchingImage: boolean;
  activeStep: 0 | 1 | 2;
  error: string | null;
};

const initialState: ProfileWizardSlice = {
  name: '',
  email: '',
  password: '',
  profilePhoto: null,
  profilePhotoUrl: '',
  description: '',
  fetchingImage: false,
  activeStep: 0,
  error: null,
};

export const {
  reducer,
  actions: {
    resetState,
    setFirstStep,
    setActiveStep,
    fetchImageSuccess,
    fetchImageStart,
    fetchImageError,
  },
} = createSlice({
  name: 'profileWizard',
  initialState,
  reducers: {
    resetState: () => initialState,
    setFirstStep: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
      }>,
    ) => {
      return { ...state, activeStep: 1, ...action.payload };
    },
    fetchImageStart: (state) => {
      state.fetchingImage = true;
      state.error = null;

      return state;
    },
    fetchImageError: (state, action: PayloadAction<string>) => {
      state.fetchingImage = false;
      state.error = action.payload;

      return state;
    },
    setActiveStep: (
      state,
      action: PayloadAction<ProfileWizardSlice['activeStep']>,
    ) => {
      state.activeStep = action.payload;

      return state;
    },
    fetchImageSuccess: (
      state,
      action: PayloadAction<{
        description: string;
        profilePhoto: File;
        profilePhotoUrl: string;
      }>,
    ) => {
      return {
        ...state,
        ...action.payload,
        fetchingImage: false,
        activeStep: 2,
      };
    },
  },
});

export const setSecondStep = createAction<{
  description: string;
  profilePhoto: File;
}>('profileWizard/setSecondStep');
