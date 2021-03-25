import React, { Component } from 'react';
import MovieMediaCard from './MovieMediaCard';

class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        this.getMoviesList();
    }

    getMoviesList = () => {
        fetch('/api/nowPlayingMovies')
            .then(res => res.json())
            .then(list => this.setState({ movies: list.moviesList})) 
    }

    render() {
        return (
            <MovieMediaCard list={this.state.movies} />
        );
    }
}

export default MoviesList;