import React from 'react';
import cx from 'classnames';
import {
  makeStyles,
  FormLabel,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import capitalize from '../../../../utils/capitalize';

const useStyles = makeStyles((theme) => ({
  dropZone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `2px dashed ${theme.palette.primary.light}`,
    padding: theme.spacing(4),
    cursor: 'pointer',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.hint,
    borderRadius: theme.spacing(1),
  },
  dropZoneUploaded: {
    color: theme.palette.text.primary,
  },
  dropZoneError: {
    borderColor: theme.palette.error.main,
  },
  fileInput: {
    display: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  error: {
    fontSize: '.75rem',
    color: theme.palette.error.main,
    marginBottom: theme.spacing(1),
  },
}));

export type SecondStepInitialValues = {
  profilePhoto: File | null;
  description: string;
};

export interface SecondStepSchema extends SecondStepInitialValues {
  profilePhoto: File;
}

export type SecondStepProps = {
  initialValues: SecondStepInitialValues;
  onSubmit: (values: SecondStepSchema) => void;
  loading: boolean;
  onBack: () => void;
};

const SecondStep = ({
  loading,
  onSubmit,
  initialValues,
  onBack,
}: SecondStepProps) => {
  const classes = useStyles();

  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<{
    description: string;
    profilePhoto: File | null;
  }>({
    initialValues,
    validationSchema: yup.object({
      profilePhoto: yup
        .mixed<null | File>()
        .required('Proile photo is a required field')
        .test(
          'fileFormat',
          'Only image files are accepted',
          (file) => file && file.type.includes('image/'),
        ),
      description: yup.string().required(),
    }),
    onSubmit: (values) => onSubmit(values as SecondStepSchema),
    validateOnBlur: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="profilePhoto">
        <FormLabel>Upload a profile photo</FormLabel>
        <div
          className={cx(classes.dropZone, {
            [classes.dropZoneUploaded]: !!values.profilePhoto,
            [classes.dropZoneError]: !!errors.profilePhoto,
          })}
        >
          {values.profilePhoto
            ? values.profilePhoto.name
            : 'Click to choose a file or drag-and-drop it here'}
        </div>
        <input
          disabled={loading}
          name="profilePhoto"
          type="file"
          id="profilePhoto"
          accept="image/*"
          className={classes.fileInput}
          onChange={({ currentTarget: { files } }) =>
            setFieldValue('profilePhoto', files && files[0])
          }
        />
      </label>
      {errors.profilePhoto && (
        <Typography className={classes.error}>
          {capitalize(errors.profilePhoto)}
        </Typography>
      )}
      <TextField
        disabled={loading}
        multiline
        rows={2}
        rowsMax={5}
        label="Enter a short description about yourself"
        fullWidth
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        error={!!(touched.description && errors.description)}
        helperText={
          touched.description &&
          errors.description &&
          capitalize(errors.description)
        }
      />
      <div className={classes.buttonContainer}>
        <Button disableElevation disabled={loading} onClick={onBack}>
          Back
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            disableElevation
            color="primary"
            variant="contained"
            type="submit"
          >
            Continue
          </Button>
        )}
      </div>
    </form>
  );
};

export default SecondStep;
