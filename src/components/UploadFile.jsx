import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import MovieIcon from '@mui/icons-material/Movie';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './../context/AuthContext';

export default function UploadFile() {
    const { uploadVideo } = React.useContext(AuthContext);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const file = e.target.files[0];
        if ('' === e.target.files[0]) {
            //console.log('blank ');
            setError('please provide a file name');
            return;
        } else if ((file.size / (1024 * 1024)) > 100) {
            //console.log((file.size / (1024 * 1024)));
            setError('This viedo is too large, please provide a viedo with size less than or equal to 100MB');
            return;
        }
        setLoading(true);
        let uid = uuidv4();
        try {
            setError('');
            //console.log('ok all are fine');
            await uploadVideo(uid, file,setLoading); // it is not blocking call you can see in //console.log() and due to that before whole video is uploaded upload button become enable
            //console.log('hello');
            // setLoading(false);
        } catch (e) {
            //console.log('eroor)');
            //console.log(e);
            setLoading(false);
            setError(e);
        }
    }

    return (
        <>
            <div style={{ marginTop: '5rem', marginBottom: '1rem' }}>
                {
                    error !== '' && <Alert severity="error">{error}</Alert>
                }
                <>
                    <input type="file" accept="viedo/*" onChange={handleChange} id='upload-input' style={{ display: 'none' }} />
                    <label htmlFor="upload-input">
                        {/* component="span" is used to tell Button component that you are gonna work for particular input */}
                        <Button variant="outlined" color='secondary' component="span" disabled={loading}>
                            <MovieIcon />Upload Video</Button>
                    </label>
                </>
            </div>
        </>
    )
}