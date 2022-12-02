import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from './../context//AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Like2(props) {
    const [userLikeStatus, setUserLikeStatus] = useState();
    const {user,changeUserLikeStatus} = useContext(AuthContext);
    useEffect(() =>{
        if (props.post.likes.includes(user.uid))
                setUserLikeStatus(true);
            else
                setUserLikeStatus(false);
    },[props.post.likes]);
    const handleLike = () => {
        changeUserLikeStatus(props.postId, userLikeStatus, setUserLikeStatus);
    }
    return (
        <div>
            {
                userLikeStatus != null ?
                    <>
                        {
                            userLikeStatus === true ? <FavoriteIcon style={{ padding: '1rem', paddingTop: '0.5rem' }} className={`like`} onClick={handleLike} /> : <FavoriteIcon style={{ padding: '1rem', paddingTop: '0.5rem' }} className={`unlike2`} onClick={handleLike} />
                        }
                    </> :
                    <></>
            }
        </div>
    )
}

export default Like2