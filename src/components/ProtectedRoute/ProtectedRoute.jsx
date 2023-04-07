import { Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import {getRoles} from '../../utilities/users-service'

export default function ProtectedRoute({ user, requiredRoles }) {
    const navigate = useNavigate()
    const roles = getRoles()
    const hasPermission = roles.some(role => requiredRoles.includes(role))
    // console.log(hasPermission)

  return (
    hasPermission ? <Outlet /> : <Navigate to='/unauthorized'/> 
  )
}