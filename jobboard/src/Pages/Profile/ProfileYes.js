import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

function ProfileYes() {
  const [userData, setUserData] = useState({});
  const [preview_profileImage, setPreview_ProfileImage] = useState([])
  const [emailVerified, setEmailVerified] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleEmail = async () => {
    try {
      const result = await axios.post('http://localhost:3000/api/verify/sendverificationemail', { email: userData.email })
      alert(result.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchData(data) {
    try {
      let result = await axios.get(`http://localhost:3000/api/auth/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      });
      setUserData(result.data);
      if(result.data.emailVerified === true){
        setEmailVerified(true)
      }
      setPreview_ProfileImage(`data:${result.data.profile_ImageType};base64, ${Buffer.from(result.data.profileImageBuffer.data).toString('base64')}`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        fetchData(user);
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div>
      <div className='ProfileContainer'>
        <div className='ProfileInfo'>
          <img className = "Profile_Pic" src={preview_profileImage} alt="profileImage" />
          <p>Username : {userData.pseudo}</p>
          <p>Name : {userData.name}</p>
          <p>Last name: {userData.lastname}</p>
          <p>Mail: {userData.email}</p>
          <p>{emailVerified === true ? 'Your email is verified' : 'Your email is not verified'}</p>
          {!emailVerified && <p className='pointer' onClick = {(e) => handleEmail(e)}>Click here to send another verification email!</p>}
          <p>Phone number : {userData.phone}</p>
          

          <p><Link to={`/EditProfile/${userData._id}`}>Edit</Link></p>
        </div>
        <div className='ProfileColor'></div>
      </div>
    </div>
  )
}

export default ProfileYes