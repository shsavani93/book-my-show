import React, { Component } from 'react';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

class TopRatedMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      movieType: props.match.params.type,
      currentMovies: [],
      currentPage: null,
      totalPages: null,
      totalMovies: 1
    }
  }

  componentDidMount() {
    this.getTopRatedMovies(1);
  }

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    console.log(currentPage)
    this.getTopRatedMovies(currentPage);
    const { movies } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    const currentMovies = movies.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentMovies, totalPages });
  }

  getTopRatedMovies = (page) => {
    console.log(page)
    fetch(`/api/topRatedMovies/${page}`)
      .then(res => res.json())
      .then(list => this.setState({ movies: list.moviesList.results, currentMovies: list.moviesList.results}));
      
  }

  render() {
    const { currentMovies, currentPage, totalPages } = this.state;
    const totalMovies = this.state.totalMovies;

    if (totalMovies === 0) return null;

    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                Movies
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={310} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
          </div>
          {currentMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    );
  }
}

export default TopRatedMovies;