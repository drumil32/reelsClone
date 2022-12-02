import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Likes(props) {
    const { givePostLikes, giveUserLikeStatus, changeUserLikeStatus, user } = useContext(AuthContext);
    const [likes, setLikes] = useState([]);
    const [userLikeStatus, setUserLikeStatus] = useState();

    useEffect(() => {
        givePostLikes(props.postId, setLikes);
        giveUserLikeStatus(props.postId, setUserLikeStatus);
        // setLikes(props.post.likes);
        // if (props.post.likes.includes(user.uid))
        //         setUserLikeStatus(true);
        //     else
        //         setUserLikeStatus(false);
    }, []);


    //console.log(likes);
    const handleLike = () => {
        changeUserLikeStatus(props.postId, userLikeStatus, setUserLikeStatus);
    }
    return (
        <>
            {/* <button style={{ backgroundColor: color }} onClick={handleClick}>this is button{likes.length}</button> */}

            <div>
                {
                    userLikeStatus !== null ?
                        <>

                            <div className='icon-styling like'>
                                {
                                    userLikeStatus === true ? <FavoriteIcon className={`icon-styling like`} onClick={handleLike} /> : <FavoriteIcon className={`icon-styling unlike`} onClick={handleLike} />
                                }
                            </div>
                            <h4 className='likes-count'>{likes.length}</h4>
                        </> :
                        <></>
                }
            </div>
        </>
    );
}

export default Likes