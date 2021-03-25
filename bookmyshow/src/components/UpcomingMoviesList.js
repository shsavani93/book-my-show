import React, { Component } from 'react';
import MovieMediaCard from './MovieMediaCard';
import authHeader from '../services/auth-header';

class UpcomingMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            errorMessage: null   
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        fetch('/api/upcomingMovies', {headers: authHeader()})
            .then(res => res.json())
            .then(res => {
                if(res.message != null){
                    this.setState({ errorMessage: res.message})
                } else{
                    this.setState({ movies: res.moviesList});
                }
            })
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : <MovieMediaCard list={this.state.movies} />}
            </div>
        );
    }
}

export default UpcomingMoviesList;