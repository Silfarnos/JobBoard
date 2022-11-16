import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminCommentList from './AdminCommentList';

function AdminGetComments(props) {
  const userData = JSON.parse(localStorage.getItem('user'))
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [render, setRender] = useState(false)
  const level = props.user.level

  function reRender() {
    setRender(!render)
  }

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function fetchData(element) {
    try {
      let skip = (element - 1) * 10;
      const result = await axios.get(`http://localhost:3000/api/comment/comment/${skip}`, {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      });
      setComments(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchTotalComments() {
    try {
      let totalComments = await axios.get("http://localhost:3000/api/comment/commentcount/", {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      });
      setTotalComments(totalComments.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelledComments = false;
    let isCancelledCounter = false;
    const handleChangeCounter = async () => {
      await timeout(10);
      if (!isCancelledCounter) {
        fetchTotalComments();
      }
    };
    handleChangeCounter();
    const handleChangeComments = async (data) => {
      await timeout(10);
      if (!isCancelledComments) {
        fetchData(data);
      }
    };
    handleChangeComments(count);
    return () => {
      isCancelledComments = true;
    };
  }, [render]);

  async function fetchNewDataDecreased(count) {

    setCount(count - 1)

    if (count - 1 === 0) {
      setCount(1)
      return
    }

    await fetchData(count - 1)
  }

  async function fetchNewDataIncreased(count, totalComments) {

    if ((count * 10 >= 10 * Math.ceil(totalComments / 10))) {
      return
    }
    setCount(count + 1)
    await fetchData(count + 1)
  }
  return (
    <div>
      <div className='counter'>
    <span className="pointer" onClick={() => fetchNewDataDecreased(count)}>{'<'}</span>
    <span>{count}</span>
    <span className="pointer" onClick={() => fetchNewDataIncreased(count, totalComments)}>{'>'}</span>
  </div>
  <AdminCommentList comments={comments} level={level} reRender={reRender}/>
  </div>
  )
}

export default AdminGetComments