import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function AdminUserList(props) {
  const users = props.users;
  const userlevel = props.level;
  const handleDelete = async (_id, level) => {
    if (userlevel > level) {
      try {
        let res = await axios.delete(`http://localhost:3000/api/auth/delete/${_id}`, {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        })
        alert('User sucessfully Deleted!')
        props.reRender()
      } catch (error) {
        console.log(error)
      }
    }
    else {
      alert('You lack permissions!')
    }
  }
  return (
    <div>
      {users.map((user) =>
        <div key={user._id}>
          name = {user.name}
          lastname = {user.lastname}
          email = {user.email}
          phone = {user.phone}
          userId = {user._id}
          pseudo = {user.pseudo}
          level = {user.level}
          emailVerified = {user.emailVerified}
          createTime = {user.createTime}
          reponseId = {user.reponseId}
          postId = {user.postId}
          <button><Link to={`/EditProfile/${user._id}`}>Edit</Link></button>
          <button onClick={() => { handleDelete(user._id, user.level) }}>DELETE</button>
        </div>
      )}
    </div>
  )
}

export default AdminUserList