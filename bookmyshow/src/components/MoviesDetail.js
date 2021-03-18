import React, { Component } from 'react';
import ReactPlayer from "react-player";

class MoviesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {1: "x"},
            video: "1"
        }
    }

    componentDidMount() {
        this.getDetails();
        this.getVideos();
    }

    getDetails = () => {
        const movieId  = this.props.match.params.id;
        fetch(`/api/movie/${movieId}`)
            .then(res => res.json())
            .then(result => this.setState({ detail: result.moviesDetail}))
    }

    getVideos = () => {
        const movieId  = this.props.match.params.id;
        fetch(`/api/movie/${movieId}/videos`)
            .then(res => res.json())
            .then(result => this.setState({ video: result.moviesDetail.results}))
    }

    render() {
        const data = this.state.detail;
        const videoId = this.state.video[0].key;
        const videoUrl = "https://www.youtube.com/watch?v=" + videoId;
        const posterImageUrl = "https://image.tmdb.org/t/p/w500//" + data.poster_path;
        return (
            <div>
            <div className="position: absolute; top: 0; left: 0; padding-top: 50px">
            <ReactPlayer
                url={videoUrl} 
                width='100%'
                height='100%'
            />
            </div>
            <div className="col-md-6 col-sm-6">
            <img src={posterImageUrl} alt="" width="200px" height="200px" />
            </div>
            <div className=" padding-left:50px col-md-6 col-sm-6">
            <h2>{data.title}</h2>
            </div>
            
            Summary: {data.overview} <br/>
            Original Language: {data.original_language} <br/>
            Tagline: {data.tagline} <br/>
            Release Date: {data.release_date} <br/>
            </div>
        );
    }
}

export default MoviesDetail;