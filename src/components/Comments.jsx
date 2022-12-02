import React, { useContext, useState } from 'react';
import { AuthContext } from './../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Likes from './Likes'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import AddComment from './AddComment';
import ShowComments from './ShowComments';

function Comments(props) {
    const { addComment } = useContext(AuthContext);
    const [posts, setPosts] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log(props.post.comments);
    return (
        <>
            {/* <button>show component</button>
            <button onClick={handleClick}>add component</button> */}
            <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen()} />
            <Dialog
                // open={open == post.pId}
                open={open} //may lead to some issues
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth='md'
            >
                <div className="modal-container">
                    <div className="video-modal">
                        <video autoPlay={true} muted="muted" >
                            <source src={props.post.pUrl} />
                        </video>
                    </div>
                    <div className="comment-modal">
                        <Card className="card1" style={{ padding: '1rem' ,overflow: 'auto'}}>
                            <ShowComments post={props.post} />
                        </Card>
                        <Card variant="outlined" className="card2">
                            
                            <div style={{ display: 'flex' }}>
                                <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={props.userData} post={props.post} />
                            </div>
                        </Card>
                    </div>
                </div>
            </Dialog>

        </>
    )
}

export default Comments