import { Outlet, Navigate, useSearchParams } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux"



const LivreurRoute = () => {
    const {userInfo} = useSelector(state => state.auth)

 
  return userInfo && userInfo.role === 3 ? <Outlet /> : <Navigate to="/login" replace />

}

export default LivreurRoute