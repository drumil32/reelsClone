import React from 'react'

function showComments(props) {
  console.log(props.post);
  return (
    <div >
      {
        props.post.comments.map((comment,id)=>{
          return(
            <React.Fragment key={id}>
              <p>name : <b>{ comment.name }</b></p>
              <p>{comment.comment}</p>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default showComments