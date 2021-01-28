import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        maxWidth: 240,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
    },
    media: {
        height: 280,
    },
});

export default function MovieMediaCard(props) {
    const classes = useStyles();
    const imageUrl = 'https://image.tmdb.org/t/p/w500/';
    return (
        <Container>
            <Home/>
            <Grid container spacing={1}>
                {props.list.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={3} zeroMinWidth>
                        <Link to={`/movie/${movie.id}`}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.media} image={imageUrl + movie.backdrop_path} />
                                <CardContent>
                                    <Typography color="primary" variant="h6" noWrap>
                                        {movie.title} 
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle2" noWrap>
                                        {movie.release_date} 
                                    </Typography>
                                    <Typography color="primary" variant="h6" noWrap>
                                        <img src="" alt="" width="20px" height="20px" />
                                        {movie.vote_count} votes
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
