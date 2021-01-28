import React, { Component } from 'react';

class MoviesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {1: "x"}
        }
    }

    componentDidMount() {
        this.getDetails();
    }

    getDetails = () => {
        const movieId  = this.props.match.params.id;
        fetch(`/api/movie/${movieId}`)
            .then(res => res.json())
            .then(result => this.setState({ detail: result.moviesDetail}))
    }

    render() {
        const data = this.state.detail;
        console.log(data)
        return (
            <div>
                <h2>Movie Detail</h2>
                <h2>{data.title}</h2>
                Summary: {data.overview} <br/>
                Tagline: {data.tagline} <br/>
                Release Date: {data.release_date}
            </div>
        );
    }
}

export default MoviesDetail;