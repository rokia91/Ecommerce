import React from 'react'
import {useContext} from 'react'
import { authContext } from './../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AuthRoute({children}) {
    const { usertoken } = useContext(authContext);

    return usertoken ? <Navigate to="/home" /> : children;
}