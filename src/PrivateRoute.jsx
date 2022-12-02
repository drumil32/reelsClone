import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (null === user)
            navigate('/Login');
    }, [user])

    //console.log(user);
    if( user )
        return <>{children}</>;
}