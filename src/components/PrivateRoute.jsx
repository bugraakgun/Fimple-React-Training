
import { useUser } from '../context/user'
import { Navigate, Outlet } from 'react-router-dom';



export default function PrivateRoute() {
    const {currentUser} = useUser();
  return (
    currentUser ? <Outlet /> : <Navigate to="/giris" />
  )
}
