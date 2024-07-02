import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({Component}) {
    const navigate = useNavigate();
    const[isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate("/login")
        }else{
            setIsAuthenticated(true);
        }
    }, [navigate]);

    return isAuthenticated ? <Component /> : null;
}

export default ProtectedRoute;
