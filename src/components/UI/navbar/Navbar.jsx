import React from 'react';
import { Link } from 'react-router-dom';
import cl from "./Navbar.module.css";

const Navbar = () => {
    return (
            <div className={cl.navbar}>
                <div className={cl.navbar__links}>
                    <div><Link to="/about" className={cl.navbar__links_item}>О сайте</Link></div>
                    <div><Link to="/posts" className={cl.navbar__links_item}>Посты</Link></div>
                </div>
            </div>
    );
};

export default Navbar;