import React, {Component} from 'react';
import MovieMediaCard from '../components/MovieMediaCard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state =  {
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
          <div>
            <MovieMediaCard list={this.state.movies} />
          </div>
      )
  }
}

export default Home;