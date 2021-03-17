import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import UpcomingMoviesList from './components/UpcomingMoviesList';
import Home from './components/Home';
import MoviesDetail from './components/MoviesDetail';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import AuthService from './services/auth-service';
import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        currentUser: undefined,
      };
    }

    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user
        });
      }
    }

    logOut() {
      AuthService.logout();
    }

    render (){
      const { currentUser } = this.state;

      return (
        <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <h3>BookMyShow</h3>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'./coming_soon'}>
                <Button variant="contained" color="primary">
                  Coming Soon
                </Button>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'./now_playing'}>
                <Button variant="contained" color="primary">
                  Now Playing
                </Button>
                </Link>
              </li>
            </div>
          )}
          </div>
          </nav>
        <Switch>
          {/* <Route exact path='/' component={UpcomingMoviesList}/> */}
          <Route path='/coming_soon' component={UpcomingMoviesList}/>
          <Route path='/now_playing' component={MoviesList}/>
          <Route  path='/movie/:id' component={MoviesDetail}/>
          <Route path='/register' component={Registration}/>
          <Route path='/profile' component={UserProfile}/>
          <Route path='/login' component={Login}/>
        </Switch>
        </div>
      );
    }
}

export default App;