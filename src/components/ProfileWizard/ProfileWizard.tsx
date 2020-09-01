import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Step,
  Stepper,
  StepLabel,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import GlobalState from '../../store/GlobalState';
import {
  setActiveStep,
  setFirstStep,
  setSecondStep,
} from './state/profileWizardSlice';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import Summary from './components/Summary';

const STEPS = [
  'Enter a name, email, password',
  'Upload a profile photo and description',
  'Summary',
];

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(8),
    },
    fontWeight: 'bold',
  },

  formContainer: { padding: theme.spacing(4) },
}));

const ProfileWizard = () => {
  const classes = useStyles();

  const {
    email,
    name,
    password,
    activeStep,
    fetchingImage,
    description,
    profilePhoto,
    profilePhotoUrl,
    error,
  } = useSelector((state: GlobalState) => state.profileWizard);

  const dispatch = useDispatch();

  const onBack = () => dispatch(setActiveStep(activeStep === 2 ? 1 : 0));

  const getStep = (step: GlobalState['profileWizard']['activeStep']) => {
    switch (step) {
      case 0: {
        return (
          <FirstStep
            onSubmit={(v) => {
              dispatch(setFirstStep(v));
            }}
            initialValues={{ email, name, password }}
          />
        );
      }
      case 1: {
        return (
          <SecondStep
            onSubmit={(v) => dispatch(setSecondStep(v))}
            initialValues={{ description, profilePhoto }}
            loading={fetchingImage}
            onBack={onBack}
          />
        );
      }

      case 2: {
        return (
          <Summary
            email={email}
            name={name}
            profilePhotoUrl={profilePhotoUrl}
            description={description}
            onBack={onBack}
          />
        );
      }
    }
  };

  return (
    <Container fixed>
      <Typography variant="h3" className={classes.heading} color="primary">
        Create profile
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className={classes.formContainer}>{getStep(activeStep)}</div>
          {error && <Alert severity="error">{error}</Alert>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileWizard;
