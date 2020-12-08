import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default () => {

    return (
        <div id="navContainer">

            <ul id="nav">

                <div id="wrapper">
                <NavLink to='/' key='1'>Approve</NavLink>
                    <NavLink to='/fileUploader' key='2'>Upload/Download</NavLink>

                </div>
            </ul>

        </div >
    );
}