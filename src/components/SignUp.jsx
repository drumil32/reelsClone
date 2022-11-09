import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import instaImg from './../Assets/Instagram.JPG';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../context/AuthContext';

import './SignUp.css';

export default function ActionAreaCard() {
    const navigate = useNavigate();
    const store = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [error,setError] = React.useState('');
    const [loading,setLoading] = React.useState(false);

    const signUpHelper =async () => {
        console.log(file);
        if( null===file ){
            setError('please upload your prfile image');
            return;
        }
        try{
            setError(null);
            setLoading(true);
            let userObj = await store.signUp(email, password);
            await store.upload(file,userObj.user.uid,name,email);

            navigate('/Feed');
        }catch(e){
            setLoading(false);
            setError(e);
        }
    }

    return (

        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <img src={instaImg} alt="instagram" />
                    </div>
                    <CardContent>
                        <Typography className='text1' variant="subtitle1" >
                            sign up from here
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}

                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size="small" value={name} onChange={(e) => setName(e.target.value)} />

                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) =>setPassword(e.target.value)} />

                        <Button color="secondary" margin="dense" fullWidth={true} variant="outlined" startIcon={<CloudUploadIcon />} component="label">Upload Profile Image
                            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" onClick={signUpHelper} disabled={loading}>Sign Up</Button>
                    </CardActions>
                    <CardContent>
                        <Typography variant="subtitle1" className="text1">
                            By Sign Up you are agree to term and condation
                        </Typography>
                    </CardContent>
                </Card>
                <Link to="/login"> Login </Link>
                {/* <Card variant="outlined" className="card2">
                    <CardContent>
                        <Typography variant="subtitle1" className="text1">
                            Having Account ?<Link to="/login" style={{textDecoration:'none'}}> Login </Link>
                        </Typography>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
}