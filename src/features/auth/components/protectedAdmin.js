import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authslice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectLoggedInUser)
    const userInfo = useSelector(selectUserInfo)
    if(!user){
        return <Navigate to= '/Login' replace={true}></Navigate>
    }
    if(userInfo && userInfo.role!=='admin'){
        return <Navigate to= '/' replace={true}></Navigate>
    }
    return children;
}

export default ProtectedAdmin;