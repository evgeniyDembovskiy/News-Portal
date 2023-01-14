import React from "react";
import {RouterProvider} from "react-router-dom";
import "./styles/App.css"
import { getRoutes } from './router/routes';

function App() {
    const router = getRoutes();
    return (
        <RouterProvider router={router}/>
    )
}

export default App;
