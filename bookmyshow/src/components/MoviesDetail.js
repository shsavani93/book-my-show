import React, { Component } from 'react';
import ReactPlayer from "react-player";
import '../../src/Pagination.scss';
import MovieDetailTabs from './MovieDetailTabs';
import ImageCardList from './ImageCardList';
import Box from '@material-ui/core/Box';
import Button from 'react-bootstrap/esm/Button';
import image from './heart.jpg';

class MoviesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: { 1: "x" },
            video: "1",
            movieCast: [{ 1: "x" }],
            reviews: [{}],
            similarMovies: []
        }
    }

    componentDidMount() {
        this.getDetails();
        this.getVideos();
        this.getCast();
        this.getReviews();
        this.getSimilarMovies();
    }

    getDetails = () => {
        const movieId = this.props.match.params.id;
        fetch(`/api/movie/${movieId}`)
            .then(res => res.json())
            .then(result => this.setState({ detail: result.moviesDetail }))
    }

    getVideos = () => {
        const movieId = this.props.match.params.id;
        fetch(`/api/movie/${movieId}/videos`)
            .then(res => res.json())
            .then(result => this.setState({ video: result.moviesDetail.results }))
    }

    getCast = () => {
        const movieId = this.props.match.params.id;
        fetch(`/api/movie/${movieId}/credits`)
            .then(res => res.json())
            .then(result => this.setState({ movieCast: result.moviesDetail.cast }))
    }

    getReviews = () => {
        const movieId = this.props.match.params.id;
        fetch(`/api/movie/${movieId}/reviews`)
            .then(res => res.json())
            .then(result => this.setState({ reviews: result.moviesDetail.results }))
    }

    getSimilarMovies = () => {
        const movieId = this.props.match.params.id;
        fetch(`/api/movie/${movieId}/similar`)
            .then(res => res.json())
            .then(result => this.setState({ similarMovies: result.moviesList }))
    }

    findShows = () => {
        // fetch("https://api-gate2.movieglu.com/filmShowTimes/?film_id=12345&date=2018-04-12&n=10&apiKey=Z2bqVlvJYa2CjNNTZ1AFr59Iif03cEUa4ueJKBMe")
        console.log("in find shows")
    }

    render() {
        const data = this.state.detail;
        console.log(data)
        const moviesCast = this.state.movieCast.filter(cast => cast.known_for_department === "Acting" && cast.order < 10)
        const videoId = this.state.video[0] ? this.state.video[0].key : null;
        const videoUrl = videoId != null ? "https://www.youtube.com/watch?v=" + videoId : null;
        const posterImageUrl = "https://image.tmdb.org/t/p/w500//" + data.poster_path;
        const popularity = data.popularity < 10 ? Math.round(data.popularity * 10) + "%" : "";
        const genre = this.state.detail['1'] != "x" ? this.state.detail.genres.slice(0,3).map((gen) => {
                return <span style={{paddingLeft: "10px"}}><Button style={{borderColor: "grey", backgroundColor: "grey"}}>{gen.name}</Button></span>
        }) : <br/>
        let time = data.runtime || null;
        var hours = Math.floor(time /60) + "h";
        var minutes = time % 60 + "mm";

        return (
            <div>
                <div id="player1">
                    {videoUrl ? (<ReactPlayer
                        className="player"
                        url={videoUrl}
                        height="400px"
                        width="100%"
                    />) : <br />}

                    <div className="row col-md-12 col-sm-12">
                        <div className="col-md-6 col-sm-6" style={{ paddingLeft: "130px", marginTop: "-8px" }}>
                            <img src={posterImageUrl} alt="" width="200px" height="300px" />
                        </div>
                        <div className="col-md-6 col-sm-6" style={{ paddingTop: "2px", marginLeft: "-88px" }}>
                            <h1>{data.title}</h1>
                            <Box component="span" m={1}>
                                <Button style={{borderColor: "lightgrey", backgroundColor: "lightgrey"}}>{data.original_language}</Button>
                                <span style={{marginLeft: "15px"}}>{genre}</span>
                                <Button style={{borderColor: "lightslategray", backgroundColor: "lightslategray", marginLeft: "13px"}}>{hours + " " + minutes}</Button>
                                {popularity? <img src={image} alt="Popularity" width="70px" height="70px" /> : ""}
                                <span style={{marginLeft: "-25px"}}>{popularity}</span>
                                <Button style={{ marginLeft: "550px", marginTop: "-108px" }} onClick={this.findShows}>Find Shows</Button>
                            </Box>
                        </div>


                        <div className="col-md-12 col-sm-12" style={{ marginTop: "-150px", paddingLeft: "505px" }}>
                            <MovieDetailTabs summary={data.overview} cast={moviesCast} reviews={this.state.reviews} />
                        </div>
                        <div className="col-md-12 col-sm-12" style={{ marginLeft: '50px', marginTop: "10px" }}>
                            {this.state.similarMovies.length != 0 ? (
                                <ImageCardList movies={this.state.similarMovies} />) : <br />}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default MoviesDetail;