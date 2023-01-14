import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./styles/App.css"
import { getPublicRoutes, getPrivateRoutes } from './router/routes';
import { AuthContext } from './context/index';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const router = isAuth ? getPrivateRoutes() : getPublicRoutes();

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            setIsAuth(true)
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <RouterProvider router={router}/>
        </AuthContext.Provider>

    )
}

export default App;
