import React from 'react';
import {
  Grid,
  Avatar,
  Typography,
  makeStyles,
  Link,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: `${theme.spacing(2)}px solid white`,
  },
  avatarLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: 'translateY(-50%)',
    height: '2px',
    background: theme.palette.grey[200],
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

export type SummaryProps = {
  profilePhotoUrl: string;
  email: string;
  name: string;
  description: string;
  onBack: () => void;
};

const Summary = ({
  profilePhotoUrl,
  description,
  name,
  email,
  onBack,
}: SummaryProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} className={classes.avatarContainer}>
        <div className={classes.avatarLine} />
        <Avatar src={profilePhotoUrl} className={classes.avatar} />
        <Typography>{name}</Typography>
        <Typography color="primary">
          <Link href={`mailto:${email}`}>{email}</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary">About me:</Typography>
        <Typography>{description}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.buttonsContainer}>
        <Button disableElevation onClick={onBack}>
          Back
        </Button>
        <Button
          disableElevation
          color="primary"
          variant="contained"
          type="submit"
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
