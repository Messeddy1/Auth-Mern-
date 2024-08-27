import { useSelector } from "react-redux"
import {Navigate,Outlet} from "react-router-dom"
const PrivateRoutes = () => {
    const {user}= useSelector((state)=>state.Auth)
 
  return user ? <Outlet/> : <Navigate to="/login" replace/>
}

export default PrivateRoutes
