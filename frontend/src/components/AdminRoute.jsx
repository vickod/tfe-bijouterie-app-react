import { Outlet, Navigate, useSearchParams } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux"



const AdminRoute = () => {
    const {userInfo} = useSelector(state => state.auth)

 
  return userInfo && userInfo.role === 2 ? <Outlet /> : <Navigate to="/login" replace />

}

export default AdminRoute