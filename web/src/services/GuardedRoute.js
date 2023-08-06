import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

/**
 * Protect Private Route
 * @returns {Element}
 * @constructor
 */
const GuardedRoute = () => {
    function hasJWT() {
        let flag = false;
        localStorage.getItem("accessToken") ? flag = true : flag = false
        return flag
    }
    return hasJWT() ? <Outlet/> : <Navigate to={{pathname: '/login'}}/>
}

/**
 * Check if user has a access token.
 * @returns {Element}
 * @constructor
 */
const CheckAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken !== null ? <Navigate to={{pathname: "/"}}/> : <Outlet/>
}

export {GuardedRoute, CheckAuth};
