import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <h1>Book My Show</h1>
      <Link to={'./coming_soon'}>
      <Button variant="contained" color="primary">
        Coming Soon
      </Button>
      </Link>
      <Link to={'./now_playing'}>
      <Button variant="contained" color="primary">
        Now Playing
      </Button>
      </Link>
    </div>
  );
}