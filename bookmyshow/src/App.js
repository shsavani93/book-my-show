import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MoviesList from './components/MoviesList';
import MoviesDetail from './components/MoviesDetail';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Search from './components/Search/Search';
import Home from './components/Home';
import UpcomingMoviesList from './components/UpcomingMoviesList';
import TopRatedMovies from './components/TopRatedMovies';
import Header from './components/Header';

import AuthService from './services/auth-service';
class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
        currentUser: undefined,
        query: ''
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
      this.setState({currentUser:null})
    }

    handleChange(e) {
      this.setState({ query: e.target.value });
    }

    render (){
      const { currentUser } = this.state;
      return (
        <div>
          {currentUser ? (
              <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">BookMyShow</Navbar.Brand>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link  as={Link} to="/movies/now_playing" >Now Playing</Nav.Link>
                    <Nav.Link  as={Link} to="/movies/top_rated" >Top Rated</Nav.Link>
                    <Nav.Link  as={Link} to="/movies/upcoming" >Upcoming</Nav.Link>
                    <Form inline>
                      <FormControl type="text" value={this.state.query} onChange={ this.handleChange.bind(this) } placeholder="Search" className="mr-sm-2" />
                      <Link to={`/search/${this.state.query}`}>
                        <Button variant="outline-info">Search</Button>
                      </Link>
                    </Form>
                    <Nav className="ml-auto">
                      <Form inline>
                        <Link to="/">
                          <Button variant="outline-info" onClick={this.logOut}>Logout</Button>
                        </Link>
                      </Form>
                    </Nav>
                </Navbar>
              </div>
          ) : (
              <div>
                <Header/>
              </div>
          )}
        <Switch>
          {/* <Route  path='/movies/:type' component={MoviesList}/> */}
          <Route  exact path='/' component={Home}/>
          <Route  exact path='/movies/now_playing' component={MoviesList}/>
          <Route exact path='/movies/upcoming' component={UpcomingMoviesList}/>
          <Route exact path='/movies/top_rated' component={TopRatedMovies}/>
          <Route path="/movie/:id" render={(props) => (
            <MoviesDetail key={props.match.params.id} {...props} />)
          } />
          <Route path='/register' component={Registration}/>
          <Route path='/profile' component={UserProfile}/>
          <Route path='/login' component={Login}/>
          <Route path="/search/:query" render={(props) => (
            <Search key={props.match.params.query} {...props} />)
          } />
        </Switch>
        </div>
      );
    }
}

export default App;