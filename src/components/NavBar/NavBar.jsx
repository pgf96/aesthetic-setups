import { Link } from 'react-router-dom';
import { logOut } from '../../utilities/users-service';
import { login } from '../../utilities/users-service';

export default function NavBar({user, setUser}) {

  const handleLogOut = () => {
    logOut()
    setUser(null)
    
  }


  const handleLogin = () => {
    login()
    
  }

  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      
      {user ?
      <>
      &nbsp; | &nbsp;
      <p>Welcome, {user.name} </p>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      </>
      :
      <>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogin}>Log In</Link>    
      </>
      }
    </nav>
  );
}
