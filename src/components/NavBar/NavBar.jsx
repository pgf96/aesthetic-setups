
import './NavBar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserLogOut from '../UserLogOut/UserLogOut';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



export default function NavBar({ user, setUser }) {

  const location = useLocation();

  // Only render Navbar component if current path is not the auth page path
  if (location.pathname === '/auth/login') {
    return null
  }
  return (
    <Navbar className='navbar' variant='dark' expand="lg" sticky='top' >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand>
        <img className='logo' src='https://res.cloudinary.com/db6jsod0y/image/upload/v1676591418/The_world_studios-removebg-preview_p1rfcf.png'></img>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/'>Home</Nav.Link>
          <Nav.Link as={Link} to='/battlestations/new'>Add</Nav.Link>
          {/* if the user is an admin */}
          {
            user && user.roles.includes('admin') && (
              <Nav.Link as={Link} to='/pending'>Pending</Nav.Link>
          )}
        </Nav>
        <Nav>
          <UserLogOut user={user} setUser={setUser} />
          {!user ?
            <Nav.Link className='login-nav' as={Link} to='/auth/login'>
              login
            </Nav.Link>
            :
            ""}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // </Container>
  );
}
