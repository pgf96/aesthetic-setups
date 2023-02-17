import { logOut } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './UserLogOut.css'

export default function UserLogOut({ user, setUser }) {

  const navigate = useNavigate()

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/')
  }

  return (
      <div className="UserLogOut">

        {user &&
        <> 
        <Button variant="outline-success" className="logout-button" onClick={handleLogOut}>Logout</Button>
        </>
        }
    </div>
  );
}
