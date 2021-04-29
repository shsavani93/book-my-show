import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    this.getLatestMovies();
  }

  getLatestMovies() {
    fetch('/api/popularMovies')
      .then(res => res.json())
      .then(list => this.setState({ movies: list.moviesList }))
  }

  render() {
    const data = this.state.movies;
    const posterImageUrl = "https://image.tmdb.org/t/p/w500//";
    return (
      <div>
        <Carousel>
          {data.slice(1, 6).map(movie =>
            <Carousel.Item key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={posterImageUrl + movie.poster_path}
                  width="100%"
                  height="500px"
                  alt=""
                />
              </Link>
              <Carousel.Caption>
                <h3>{movie.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div >

    )
  }
}

export default Home;