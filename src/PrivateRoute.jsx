import React,{useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({redirectPath = '/',children}){
    const {user} = useContext(AuthContext);
    console.log(user);
    if( !user ) return <Navigate to={redirectPath} replace/>
    return children;
}