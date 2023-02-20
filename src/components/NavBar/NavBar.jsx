
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
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/battlestations/new'>Add</Nav.Link>
            <Nav.Link as={Link} to='/pending'>Pending</Nav.Link>  
            
            {/* <Link to='/'>Home</Link> */}
            {/* <Link to='/battlestations/new'> Add</Link> */}
          </Nav>
        <Nav className='me-auto'>
          <Navbar.Brand className='brand-center'>
            <img className='logo' src='https://res.cloudinary.com/db6jsod0y/image/upload/v1676591418/The_world_studios-removebg-preview_p1rfcf.png'></img>
          </Navbar.Brand>
        </Nav>
          <Nav className='ml-auto'>
            <UserLogOut user={user} setUser={setUser} />
            {!user ?
              <Nav.Link as={Link} to='/auth/login'>
                <Button className='login-button'>
                  login
                </Button>
              </Nav.Link> 
            : 
            ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
