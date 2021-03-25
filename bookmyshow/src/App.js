import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import UpcomingMoviesList from './components/UpcomingMoviesList';
//import Home from './components/Home';
import MoviesDetail from './components/MoviesDetail';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import AuthService from './services/auth-service';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
              <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">BookMyShow</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/profile">{currentUser.username}</Nav.Link>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link  as={Link} to="./now_playing" >Now Playing</Nav.Link>
                    <Nav.Link  as={Link} to="./upcoming_movies" >Upcoming Movies</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button variant="outline-info" onClick={this.logOut}>Logout</Button>
                    </Form>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
              </div>
          ) : (
              <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">BookMyShow</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link  as={Link} to="./login" >Login</Nav.Link>
                    <Nav.Link  as={Link} to="./register" >Sign Up</Nav.Link>
                    <Nav.Link  as={Link} to="./now_playing" >Now Playing</Nav.Link>
                    <Nav.Link  as={Link} to="./upcoming_movies" >Upcoming Movies</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
              </div>
          )}
          </div>
          </nav>
        <Switch>
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/upcoming_movies' component={UpcomingMoviesList}/>
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