import React from 'react';
import { Grid, TextField, makeStyles, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import capitalize from '../../../../utils/capitalize';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const validationSchema = yup.object({
  name: yup.string().required().min(4).max(128),
  email: yup.string().email('Email is invalid').required(),
  password: yup.string().required().min(8).max(512),
  repeatPassword: yup.string().when('password', {
    is: (pass) => !!pass,
    then: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  }),
});

export type FirstStepSchema = {
  name: string;
  password: string;
  email: string;
};

export type FirstStepProps = {
  initialValues: FirstStepSchema;
  onSubmit: (values: FirstStepSchema) => void;
};

const FirstStep = ({ onSubmit, initialValues }: FirstStepProps) => {
  const classes = useStyles();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      ...initialValues,
      repeatPassword: initialValues.password,
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={!!(touched.name && errors.name)}
            helperText={touched.name && errors.name && capitalize(errors.name)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={!!(touched.email && errors.email)}
            helperText={
              touched.email && errors.email && capitalize(errors.email)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={!!(touched.password && errors.password)}
            helperText={
              touched.password && errors.password && capitalize(errors.password)
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Repeat password"
            variant="outlined"
            type="password"
            name="repeatPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repeatPassword}
            error={!!(touched.repeatPassword && errors.repeatPassword)}
            helperText={
              touched.repeatPassword &&
              errors.repeatPassword &&
              capitalize(errors.repeatPassword)
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            disableElevation
            color="primary"
            variant="contained"
            type="submit"
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FirstStep;
