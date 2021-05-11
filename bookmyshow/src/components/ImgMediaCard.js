import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  }
}));


export default function ImgMediaCard(props) {
 const classes = useStyles();
  const imageUrl = "https://image.tmdb.org/t/p/w500//";
  return (
    <div>
      <GridList cols={5} style={{padding:"60px", paddingLeft: "9px", paddingTop: "10px"}}>
        {props.castDetails.map((tile) => (
          <GridListTile key={tile.id}>
            <Avatar alt={tile.name} src={imageUrl+ tile.profile_path} className={classes.large}  />
              <p>{tile.name}</p>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

