import instaImg from './../Assets/Instagram.JPG';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Button, CardActions } from '@mui/material';
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
// import img1 from '../Assets/img1.jpg';
// import img2 from '../Assets/img2.jpg';
// import img3 from '../Assets/img3.jpg';
// import img4 from '../Assets/img4.jpg';
// import img5 from '../Assets/img5.jpg';
// import bg from '../Assets/insta.png'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../context/AuthContext';
import './Login.css'

export default function Login() {
    const navigate = useNavigate();
    const store = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const loginHelper = async () => {
        if ('' === email) {
            setError('please give  email id');
            return;
        } else if ('' === password) {
            setError('please give password');
            return;
        }
        try {
            setError('');
            let user = await store.login(email, password);
            //console.log(user);
            navigate('/Feed');
        } catch (e) {
            setError('user not found');
            return;
        }
    }
    return (
        <>
            <Link to='/Feed'> feed </Link>
            <div className="loginWrapper">
                {/* <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                    <div className="car">
                        <CarouselProvider
                            visibleSlides={1}
                            totalSlides={5}
                            // step={3}
                            naturalSlideWidth={238}
                            naturalSlideHeight={423}
                            hasMasterSpinner
                            isPlaying={true}
                            infinite={true}
                            dragEnabled={false}
                            touchEnabled={false}
                        >
                            <Slider>
                                <Slide index={0}><Image src={img1} /></Slide>
                                <Slide index={1}><Image src={img2} /></Slide>
                                <Slide index={2}><Image src={img3} /></Slide>
                                <Slide index={3}><Image src={img4} /></Slide>
                                <Slide index={4}><Image src={img5} /></Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>
                </div> */}
                <div className="loginCard">
                    <Card variant="outlined">
                        <div className="insta-logo">
                            <img src={instaImg} alt="" />
                        </div>
                        <CardContent>
                            {error!=='' && <Alert severity="error">{error}</Alert>}
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Typography className='text2' color="primary" variant="subtitle1">
                                Forget Password ?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button color="primary" fullWidth={true} variant="contained" onClick={loginHelper}>
                                Log in
                            </Button>
                        </CardActions>
                    </Card>
                    <Link to="/SignUp" >Signup</Link>
                    {/* <Card variant="outlined" className='card2'>
                        <h1 style={{ color: 'green' }}>hello</h1>
                        <CardContent>
                            <h1 style={{color:'black'}}>hello</h1>
                            <Typography className='text1' variant="subtitle1">
                                Don't have an account ? <Link to="/signup" style={{ textDecoration: 'none' }}>Signup gekko</Link>
                            </Typography> 
                        </CardContent>
                    </Card> */}
                </div>
            </div>
        </>
    );
}