import React, { useState } from 'react'
import NotLoggedIn from './Profile/NotLoggedIn'
import axios from 'axios'
import { Buffer } from 'buffer'
import { Link } from 'react-router-dom';
import NavBar from '../Components/Navbar';

function UserComments() {
  const [render, setRender] = useState(false)

  function reRender() {
    setRender(!render)
  }

  var display = 'false'
  if (!localStorage.getItem('user')) {
    display = 'false'
  } else {
    display = 'true'
  }
  
  const [comments, setComments] = React.useState([]);

  let user = null
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'))
  } else {
    user = {
      userId: '1',
      level: 0
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comment/${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      }
      )
      alert('Comment sucessfully Deleted!')
      reRender()
    } catch (error) {
      console.log(error)
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comment/user/${user.userId}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      })

      const commentInfo = response.data
      async function addImage(commentInfo) {
        await commentInfo.forEach(element => {
          if (element.fileBuffer) {
            element.img = `data:application/pdf;base64, ${Buffer.from(element.fileBuffer.data).toString('base64')}`
          }
        });
      }
      await addImage(commentInfo);
      setComments(commentInfo)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        await fetchData();
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, [render])

  return (
    <div>
      <NavBar />
      {display === 'true' && <div>
      <h3>My job applications</h3>
      {comments.map((comment) =>
        <div className="joboffers" key={comment._id}>
          <p>{comment.description}</p>
          {comment.img && <embed src={comment.img }alt="application_CV_PDF" />}
          <p>{comment.creatorName}</p>
          <p>{comment.creatorLastName}</p>
          <p>{comment.creatorEmail}</p>
          <p>{comment.creatorPhone}</p>
          <p>{comment.description}</p>
          <p>{comment.firstQuestionAnswer}</p>
          <p>{comment.secondQuestionAnswer}</p>
          <p>{comment.thirdQuestionAnswer}</p>
          <Link to={`/offer/${comment.offerId}`}><button>Offer</button></Link>
          {(user.userId === comment.creatorId || user.level >= 1) && <div>
            <Link to={`/editcomment/${comment._id}`} ><button>Edit</button></Link>
            <button className='pointer' onClick={() => { handleDelete(comment._id) }}>DELETE</button>
          </div>}
        </div>
      )}
    </div>}

      {display === 'false' && <NotLoggedIn />}
    </div>
  )
}

export default UserComments