import { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: ''
        }
    }

    handleChange(e) {
        this.setState({ query: e.target.value });
    }

    componentDidMount(){
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">BookMyShow</Navbar.Brand>
                <Nav.Link as={Link} to="/movies/now_playing" >Now Playing</Nav.Link>
                <Nav.Link as={Link} to="/movies/top_rated" >Top Rated</Nav.Link>
                <Nav.Link as={Link} to="/movies/upcoming" >Upcoming</Nav.Link>
                <Form inline>
                    <FormControl type="text" value={this.state.query} onChange={this.handleChange.bind(this)} placeholder="Search" className="mr-sm-2" />
                    <Link to={`/search/${this.state.query}`}>
                        <Button variant="outline-info">Search</Button>
                    </Link>
                </Form>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}