import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {AuthContext} from './../context/AuthContext'

function AddComment(props) {
  const [inputData, setInputData] = useState('');
  const {addComment} = useContext(AuthContext);
  const handleClick = () => {
    addComment(inputData,props.post.postId);
    setInputData('');
  }
  return (
    <div style={{ width: '100%' }}>
      <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{ width: '70%' }} value={inputData} onChange={(e) => setInputData(e.target.value)} />
      {/* <Button variant="contained" onClick={handleClick}>Post</Button> */}
      <button onClick={handleClick}>post</button>
    </div>
  );
}

export default AddComment