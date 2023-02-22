import { Outlet, useNavigate, Navigate} from 'react-router-dom'
import {getRoles} from '../../utilities/users-service'
import { useEffect } from 'react'

export default function ProtectedRoute({ user, requiredRoles }) {
    const navigate = useNavigate()
    const roles = getRoles()
    const hasPermission = roles.some(role => requiredRoles.includes(role))
    console.log(hasPermission)

  return (
    hasPermission ? <Outlet /> : <Navigate to='/unauthorized'/> 
  )
}