import React, { Component } from 'react';
import MovieMediaCard from './MovieMediaCard';

class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            query: ''
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        fetch('/api/nowPlayingMovies')
            .then(res => res.json())
            .then(list => this.setState({ movies: list.moviesList})) 
    }

    handleChange(e) {
        this.setState({ query: e.target.value });
    }

    handleClick(query, e){
        fetch('/api/movies/search/' + query)
            .then(res => res.json())
            .then(list => this.setState({ movies: list.moviesList.results}))
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <input type="text" value={this.props.query} onChange={ this.handleChange.bind(this) } placeholder="Search by title"></input>
                <button onClick={ this.handleClick.bind(this, this.state.query)}>
                    Search 
                </button>
                <MovieMediaCard list={this.state.movies} />
            </div>
        );
    }
}

export default MoviesList;