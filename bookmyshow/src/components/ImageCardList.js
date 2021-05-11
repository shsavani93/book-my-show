import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: '300px'
  },
  title: {
    color: theme.palette.primary.light,
  },
  tile: {
    width: '202px'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));


export default function ImageCardList(props) {
  const classes = useStyles();
  const imageUrl = 'https://image.tmdb.org/t/p/w500/';
  const tile = props.movies;

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {props.movies.map((tile) => (
          <Link to={`/movie/${tile.id}`}>
            <GridListTile key={tile.id} className={classes.tile}>
              <img src={imageUrl + tile.backdrop_path} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          </Link>
        ))
        }
      </GridList>
    </div>
  );
}
