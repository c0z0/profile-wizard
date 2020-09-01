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
  confirmLoading: boolean;
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
  confirmLoading: false,
};

export const {
  reducer,
  actions: {
    resetState,
    setFirstStep,
    navigateBack,
    fetchImageSuccess,
    fetchImageStart,
    fetchImageError,
    confirmStart,
    confirmSuccess,
    confirmError,
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
    navigateBack: (state) => {
      state.activeStep = state.activeStep === 2 ? 1 : 0;

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
    confirmStart: (state) => {
      state.error = null;
      state.confirmLoading = true;
    },
    confirmSuccess: (state) => {
      state.confirmLoading = false;

      // redirect to next page?
    },
    confirmError: (state, action: PayloadAction<string>) => {
      state.confirmLoading = false;
      state.error = action.payload;

      return state;
    },
  },
});

export const setSecondStep = createAction<{
  description: string;
  profilePhoto: File;
}>('profileWizard/setSecondStep');

export const confirm = createAction<{
  name: string;
  email: string;
  password: string;
  profilePhotoUrl: string;
  description: string;
}>('profileWizard/confirm');
