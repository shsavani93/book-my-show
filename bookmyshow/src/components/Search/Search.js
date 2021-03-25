import React from 'react';
import MovieMediaCard from '../MovieMediaCard';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: props.match.params.query,
      movies: []
    }
  }

  componentDidMount(){
    this.searchMovie(this.state.query);
  }

  searchMovie(query){
    fetch('/api/movies/search/' + query)
        .then(res => res.json())
        .then(list => this.setState({ movies: list.moviesList.results}))
  }

  render(){
    return (
      <MovieMediaCard list={this.state.movies} />
    )
  }
}

export default Search