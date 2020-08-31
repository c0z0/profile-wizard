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

type Step = 0 | 1 | 2;

const STEPS = [
  'Enter a name, email, password',
  'Upload a profile photo and description',
  'Summary',
];

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(8),
  },
}));

const ProfileWizard = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<Step>(0);

  const getStep = (step: Step) => {
    switch (step) {
      case 0: {
        return (
          <FirstStep
            onSubmit={() => setActiveStep(1)}
            initialValues={{ email: '', password: '', name: '' }}
          />
        );
      }
      case 1: {
        return <h1>2nd</h1>;
      }

      case 2: {
        return <h1>3rd</h1>;
      }
    }
  };

  return (
    <Container fixed>
      <Typography variant="h2" className={classes.heading}>
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
          {getStep(activeStep)}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileWizard;
