import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cl from "./Navbar.module.css";
import MyButton from './../button/MyButton';
import { AuthContext } from '../../../context';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    }

    return (
            <div className={cl.navbar}>
                <div className={cl.navbar__links}>
                    {isAuth 
                        ? <div className={cl.navbar__links_item} onClick={logout}>
                            Выйти
                        </div>
                        : <></>
                    }

                    <div><Link to="/about" className={cl.navbar__links_item}>О сайте</Link></div>
                    <div><Link to="/posts" className={cl.navbar__links_item}>Посты</Link></div>
                </div>
            </div>
    );
};

export default Navbar;