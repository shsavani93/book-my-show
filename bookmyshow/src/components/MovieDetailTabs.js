import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ImgMediaCard from './ImgMediaCard';
import { Avatar } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ShowMoreText from "react-show-more-text";
import Moment from 'react-moment';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: '#2874f0',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function MovieDetailTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const movieReviews = props.reviews;
  const imageUrl = "https://secure.gravatar.com/avatar";
  const [expand, setExpand] = useState(false);
  const onClick = () => {
    setExpand(!expand);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const computeUrl = (imagePath) => {
    var path = imagePath;
    if(path.includes('avatar')){
      path = path.split("/");
      return imageUrl + "/" + path[path.length - 1];
    }else{
      return imageUrl + imagePath;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs classes={{ indicator: classes.indicator }} style={{ backgroundColor: "white", color: "#2874f0" }} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          {props.summary}
          <br />
          <br />
          <br />
          <div className="row col-md-3 col-sm-3">
            <strong>Cast</strong>
          </div>
          <div className="container mb-3" style={{ marginTop: "-15px" }}>
            <div className="row d-flex flex-row py-3" style={{ marginLeft: "-18px" }}>
              <ImgMediaCard castDetails={props.cast} />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {value == "1" ? (
          <div>
            {movieReviews.slice(0, 6).map((review) => (
              
              <div key={review.author_details.username}>
                <Avatar alt={review.author} src={computeUrl(review.author_details.avatar_path)} className={classes.large} />
                <strong>{review.author}</strong>
                <ShowMoreText
                  lines={5}
                  more={"Show More"}
                  less={"Show Less"}
                  onClick={onClick}
                  expanded={expand}
                  width={650}
                >
                  {review.content}
                </ShowMoreText>
                <strong>Created at: </strong>
                <Moment>{review.created_at}</Moment>
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Rating name="customized-10" precision={0.5} readOnly defaultValue={2} max={10} value={review.author_details.rating} />
                </Box>
              </div>
            ))}
          </div>
        ) : "Reviews"}
      </TabPanel>
    </div>
  );
}
