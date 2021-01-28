import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import UpcomingMoviesList from './components/UpcomingMoviesList';
import Home from './components/Home';
import MoviesDetail from './components/MoviesDetail';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/coming_soon' component={UpcomingMoviesList}/>
          <Route path='/now_playing' component={MoviesList}/>
          <Route  path="/movie/:id" component={MoviesDetail}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;