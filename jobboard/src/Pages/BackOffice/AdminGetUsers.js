import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminUserList from './AdminUserList';

function AdminGetUsers(props) {
  const userData = JSON.parse(localStorage.getItem('user'))
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
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
      let skip = (element - 1) * 30;
      const result = await axios.get(`http://localhost:3000/api/auth/users/${skip}`, {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      });
      setUsers(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchTotalUsers() {
    try {

      let totalUsers = await axios.get("http://localhost:3000/api/auth/userscount/", {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      });
      setTotalUsers(totalUsers.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelledUsers = false;
    let isCancelledCounter = false;
    const handleChangeCounter = async () => {
      await timeout(10);
      if (!isCancelledCounter) {
        fetchTotalUsers();
      }
    };
    handleChangeCounter();
    const handleChangeUsers = async (data) => {
      await timeout(10);
      if (!isCancelledUsers) {
        fetchData(data);
      }
    };
    handleChangeUsers(count);
    return () => {
      isCancelledUsers = true;
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

  async function fetchNewDataIncreased(count, totalUsers) {

    if ((count * 30 >= 30 * Math.ceil(totalUsers / 30))) {
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
        <span className="pointer" onClick={() => fetchNewDataIncreased(count, totalUsers)}>{'>'}</span>
      </div>
      <AdminUserList users={users} level={level} reRender={reRender} />
    </div>
  )
}

export default AdminGetUsers