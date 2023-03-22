
import './NavBar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserLogOut from '../UserLogOut/UserLogOut';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { BiHelpCircle } from 'react-icons/bi'



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
          {user && user.roles.includes('guest') && 
          <>
            <Nav.Link as={Link} to='/battlestations/63f662e91b6e69d4961170b6'>Example Battlestation </Nav.Link>
            <span data-tooltip-id='navbar-tooltip-multiline' data-tooltip-html="Welcome! The guest account has limited access  but I provided an example <br />Battlestation which will  display all features as if you were on an account <br /> with full privileges. <br/> <br/> As of now, only users with site or admin privileges can perform actions on the <br/> publicly displayed pages. If you want more information or request <br/> additional privileges, please feel free to contact us. " >
              <BiHelpCircle style={{ color: 'white' }} /> Hover Me
            </span>
            <Tooltip
              id='navbar-tooltip-multiline'
              multiline={true}
            />
          </>
          }
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
