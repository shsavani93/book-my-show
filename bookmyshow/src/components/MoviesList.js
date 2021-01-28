import React, { Component } from 'react';
import MovieMediaCard from './MovieMediaCard';

class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ["1"]
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        fetch('/api/nowPlayingMovies')
            .then(res => res.json())
            .then(list => this.setState({ list: list.moviesList}))
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <MovieMediaCard list={this.state.list} />
            </div>
        );
    }
}

export default MoviesList;