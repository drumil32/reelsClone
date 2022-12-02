import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

export default function Feed() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <UploadFile />
                <Posts />
            </div>
        </>
    );
}