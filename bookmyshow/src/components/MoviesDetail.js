import React, { Component } from 'react';
import ReactPlayer from "react-player";
import ImgMediaCard from './ImgMediaCard';
import '../../src/Pagination.scss';

class MoviesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: { 1: "x" },
            video: "1",
            movieCast: [{ 1: "x" }]
        }
    }

    componentDidMount() {
        this.getDetails();
        this.getVideos();
        this.getCast();
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
                        height="50%"
                        width="100%"
                    />) : <h1></h1>}
                
                <div className="row col-md-12 col-sm-12">
                    <div className="col-md-6 col-sm-6" style={{ paddingLeft: "130px", paddingTop: "240px" }}>
                        <img src={posterImageUrl} alt="" width="200px" height="200px" />
                    </div>
                    <div className="col-md-6 col-sm-6" style={{ paddingTop: "260px", marginLeft: "-88px" }}>
                            <h1>{data.title}</h1>
                            {/* <p>{data.original_language}</p>   */}
                    </div>


                    <div className="row col-md-12 col-sm-12" style={{marginTop: "-60px", marginLeft: "20px"}}>
                        <div className="col-md-4 col-sm-4">
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <strong>Summary</strong>
                            <p>{data.overview}</p>
                            {/* Tagline: {data.tagline} <br /> */}
                            {/* <strong>Release Date:</strong> {data.release_date} <br /> */}
                        </div>
                    </div>


                    <div className="col-md-3 col-sm-3" style={{marginLeft: "438px"}}>
                        <strong>Cast</strong>
                    </div>
                    <div className="container mb-3" style={{marginLeft: "438px", marginTop: "15px"}}>
                        <div className="row d-flex flex-row py-3">
                            <ImgMediaCard castDetails={moviesCast} />
                        </div>
                    </div>
                </div>
                </div>
            </div>

        );
    }
}

export default MoviesDetail;