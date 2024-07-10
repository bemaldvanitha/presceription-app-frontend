import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token === null){
            setIsLoading(false)
        }else {
            setIsLoading(true);
        }
    }, []);

    return isLoading ? <div>
        <main><Outlet/></main>
    </div> : <Navigate to={'/login'}/>

}

export default AdminRoute;