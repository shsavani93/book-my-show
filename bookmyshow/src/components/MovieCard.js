import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import votes from './votes.jpg';

const useStyles = makeStyles({
    card: {
        maxWidth: 240,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
        marginTop: "20px"
    },
    media: {
        height: 280,
    },
});

export default function MovieCard(props) {
    const classes = useStyles();
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    return (
        <Grid item key={props.movie.id} xs={12} sm={3} zeroMinWidth>
            <Link to={`/movie/${props.movie.id}`}>
                <Card className={classes.card}>
                    <CardMedia className={classes.media} image={imageUrl + props.movie.backdrop_path} />
                    <CardContent>
                        <Typography color="primary" variant="h6" noWrap>
                            {props.movie.title}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2" noWrap>
                            {props.movie.release_date}
                        </Typography>
                        <Typography color="primary" variant="h6" noWrap>
                            <img src={votes} alt="Votes" width="30px" height="20px" />
                            {props.movie.vote_count} votes
                                    </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
}
