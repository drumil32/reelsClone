
import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';

import CircularProgress from '@mui/material/CircularProgress';


export default function LinearColor() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        // <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <>

            <CircularProgress />
        </>
        // {/* </Stack> */ }
    );
}