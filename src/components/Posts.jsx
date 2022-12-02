import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Likes from './Likes'
import Avatar from '@mui/material/Avatar';
import Comments from './Comments';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const { givePosts } = useContext(AuthContext);
    useEffect(() => {
        const unSubscribe = givePosts(setPosts);
        return () => unSubscribe();
    }, []);

    return (
        <>
            {
                [] === posts ? <CircularProgress /> :
                    <>
                        <div className="video-container">
                            {
                                posts.map((post, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="videos">
                                                <Video src={post.pUrl} />
                                                <div className="fa" style={{ display: 'flex' }}>
                                                    <Avatar src={post.uProfileUrl} />
                                                    <h4>{post.uName}</h4>
                                                    <Likes postId={post.postId} post={post} />
                                                    <Comments post={post} />
                                                </div>

                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </>
            }
        </>
    )
}