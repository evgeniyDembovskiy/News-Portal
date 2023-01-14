import { createBrowserRouter } from "react-router-dom";
import About from '../pages/About';
import Error from "../pages/Error";
import Posts from "../pages/Posts";
import PostIdPage from '../pages/PostIdPage';
import Navbar from '../components/UI/navbar/Navbar';

export const getRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Posts/>,
            errorElement: <Error/>,
            children: [
                {
                    path: "/",
                    element: <Navbar/>,
                },
            ]
        },
        {
            path: "/posts",
            element: <Posts/>,
        },
        {
            path: "/posts/:id",
            element: <PostIdPage/>,
        },
        {
            path: "/about",
            element: <About/>,
        },
      ]);
    return router;
}
