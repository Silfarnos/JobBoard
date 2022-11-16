import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
function AdminCommentList(props) {
  const comments = props.comments;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comment/${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      }
      )
      alert('Comment sucessfully Deleted!')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {comments.map((comment) =>
        <div key={comment._id}>
          commentId = {comment._id}
          description = {comment.description}
          creatorId = {comment.creatorId}
          offerId = {comment.offerId}
          {/* fileBuffer = {comment.fileBuffer} */}
          fileName = {comment.fileName}
          firstQuestionAnswer = {comment.firstQuestionAnswer}
          secondQuestionAnswer = {comment.secondQuestionAnswer}
          thirdQuestionAnswer = {comment.thirdQuestionAnswer}
          createTime = {comment.createTime}
          updateTime = {comment.updateTime}
          <Link to={`/editcomment/${comment._id}`} ><button>Edit</button></Link>
          <button className='pointer' onClick={() => { handleDelete(comment._id) }}>DELETE</button>
        </div>
      )}
    </div>
  )
}

export default AdminCommentList