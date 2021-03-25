import React, { Component } from 'react';
import MovieMediaCard from './MovieMediaCard';
import authHeader from '../services/auth-header';
//import SearchBar from './Search/SearchBar';

class UpcomingMoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [], 
            query: '',
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
                {/* <input type="text" value={this.props.query} onChange={ this.handleChange.bind(this) } placeholder="Search by title"></input>
                <button onClick={ this.handleClick.bind(this, this.state.query)}>
                    Search 
                </button> */}
                {/* <SearchBar /> */}
                {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : <MovieMediaCard list={this.state.movies} />}
            </div>
        );
    }
}

export default UpcomingMoviesList;