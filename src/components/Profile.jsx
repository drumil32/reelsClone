import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';
import { CircularProgress } from '@mui/material';
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import Likes from './Likes';
import Video from './Video';
import Comments from './Comments'
import './Profile.css'

function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const { giveUserData, givePostsByUserId } = useContext(AuthContext);
    useEffect(() => {
        const fun = async () => {
            giveUserData(id, setUserData);
            console.log(userData);

        }
        fun();
    }, []);
    useEffect(() => {
        if (userData != null) {
            console.log(userData);
            if (null != userData.postIds)
                givePostsByUserId(userData.postIds, setUserPosts);
        }
    }, [userData]);
    return (
        <>
            {
                userData == null || userPosts == null ? <CircularProgress /> :
                    <>
                        <Navbar />
                        <div className="spacer">
                            <div className="container">
                                <div className="upper-part">
                                    <div className="profile-img">
                                        <img src={userData.profileUrl} alt="User Profile" />
                                    </div>
                                    <div className="info">
                                        <Typography variant="h5">
                                            Email : {userData.email}
                                        </Typography>
                                        <Typography variant="h6">
                                            Posts : {userData.postIds.length}
                                        </Typography>
                                    </div>
                                </div>
                                <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                                <div className="profile-videos">
                                    {
                                        userPosts.map((userPost, index) => {
                                            console.log(userPost);
                                            return (
                                                <React.Fragment key={index}>
                                                    <div className="videos">
                                                        <video muted="muted" >
                                                            <source src={userPost.pUrl} />
                                                        </video>
                                                        <div className="fa" style={{ display: 'flex' }}>
                                                            <Likes className="abc" postId={userPost.postId} post={userPost} />
                                                            <Comments post={userPost} />
                                                        </div>

                                                    </div>
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Profile