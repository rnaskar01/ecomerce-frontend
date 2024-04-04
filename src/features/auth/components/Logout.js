import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authslice";
import { Navigate } from "react-router-dom";

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(()=>{
        dispatch(signOutAsync())
    })

    // but useEffect runs after render , so we have delay navigate part
    return (
        <>
        {!user && <Navigate to= '/Login' replace={true}></Navigate>}
        </> 
     );
}

export default Logout;