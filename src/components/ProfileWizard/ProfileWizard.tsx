import React, { useState } from 'react';
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

import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import Summary from './components/Summary';
import { FirstStepSchema } from './components/FirstStep/FirstStep';
import { SecondStepInitialValues } from './components/SecondStep/SecondStep';
import uploadPhoto from './services/uploadPhoto';

type Step = 0 | 1 | 2;

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
  const [activeStep, setActiveStep] = useState<Step>(0);

  const [firstStepValues, setFirstStepValues] = useState<FirstStepSchema>({
    name: '',
    email: '',
    password: '',
  });

  const [secondStepValues, setSecondStepValues] = useState<
    SecondStepInitialValues & { profilePhotoUrl: string }
  >({
    description: '',
    profilePhoto: null,
    profilePhotoUrl: '',
  });

  const [secondStepLoading, setSecondStepLoading] = useState(false);

  const getStep = (step: Step) => {
    switch (step) {
      case 0: {
        return (
          <FirstStep
            onSubmit={(v) => {
              setActiveStep(1);
              setFirstStepValues(v);
            }}
            initialValues={firstStepValues}
          />
        );
      }
      case 1: {
        return (
          <SecondStep
            onSubmit={async (v) => {
              setSecondStepLoading(true);

              const profilePhotoUrl = await uploadPhoto(v.profilePhoto);

              setSecondStepLoading(false);

              setSecondStepValues({ ...v, profilePhotoUrl });

              setActiveStep(2);
            }}
            initialValues={secondStepValues}
            loading={secondStepLoading}
            onBack={() => setActiveStep(0)}
          />
        );
      }

      case 2: {
        return (
          <Summary
            {...firstStepValues}
            {...secondStepValues}
            onBack={() => setActiveStep(1)}
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileWizard;
