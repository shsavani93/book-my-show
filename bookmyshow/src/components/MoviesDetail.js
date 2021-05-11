import React, { Component } from 'react';
import ReactPlayer from "react-player";
import '../../src/Pagination.scss';
import MovieDetailTabs from './MovieDetailTabs';
import ImageCardList from './ImageCardList';
import GridList from '@material-ui/core/GridList';

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

    render() {
        const data = this.state.detail;
        const moviesCast = this.state.movieCast.filter(cast => cast.known_for_department === "Acting" && cast.order < 10)
        const videoId = this.state.video[0] ? this.state.video[0].key : null;
        const videoUrl = videoId != null ? "https://www.youtube.com/watch?v=" + videoId : null;
        const posterImageUrl = "https://image.tmdb.org/t/p/w500//" + data.poster_path;

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
                        </div>


                        <div className="col-md-12 col-sm-12" style={{ marginTop: "-186px", paddingLeft: "505px" }}>
                            <MovieDetailTabs summary={data.overview} cast={moviesCast} reviews={this.state.reviews} />
                        </div>
                        <div className="col-md-12 col-sm-12" style={{ marginLeft: '50px' }}>
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