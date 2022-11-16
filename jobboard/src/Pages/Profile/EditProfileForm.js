import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useForm from '../../Components/useForm';
import { Buffer } from 'buffer';

function EditProfileForm() {
  const { handleChange, values } = useForm()
  const [profileData, setProfileData] = useState([])
  const [preview_profileImage, setPreview_ProfileImage] = useState([])
  const [preview_CV_PDF, setPreview_CV_PDF] = useState([])
  const [CV_PDF, setCV_PDF] = useState([])
  const [profile_Image, setProfileImage] = useState([])

  const id = window.location.pathname.split('/')[2]
  const userData = JSON.parse(localStorage.getItem('user'))

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }
  function handleImageCover(e) {
    const file = e.target.files[0]
    setProfileImage(file)
    const objectUrl = URL.createObjectURL(file)
    setPreview_ProfileImage(objectUrl)
  }

  function handleCV_PDF(e) {
    const file = e.target.files[0]
    setCV_PDF(file)
    const objectUrl = URL.createObjectURL(file)
    setPreview_CV_PDF(objectUrl)
  }

  async function getProfile() {
    try {
      const result = await axios.get(`http://localhost:3000/api/auth/${id}`, {
        headers: {
          authorization: `Bearer ${userData.token}`
        }
      })
      setProfileData(result.data);
      setPreview_ProfileImage(`data:${result.data.profile_ImageType};base64, ${Buffer.from(result.data.profileImageBuffer.data).toString('base64')}`)
      if(result.data.CV_PDF){
        setPreview_CV_PDF(`data:application/pdf;base64, ${Buffer.from(result.data.CV_Buffer.data).toString('base64')}`)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isCancelledProfile = false;
    const handleChangeProfile = async () => {
      await timeout(10);
      if (!isCancelledProfile) {
        getProfile();
      }
    };
    handleChangeProfile();

    return () => {
      isCancelledProfile = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ID = (profileData._id)
    const formData = new FormData()

    formData.append('profileImage', profile_Image)
    formData.append('CV_PDF', CV_PDF)
    formData.append('name', values.name)
    formData.append('lastname', values.lastname)
    formData.append('password', values.password)
    formData.append('newpassword', values.newpassword)
    formData.append('phone', values.phone)
    formData.append('pseudo', values.pseudo)

    let res = await axios.put(`http://localhost:3000/api/auth/edit/${ID}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userData.token}`
        }
      })
    alert(res.data.message)
  }

  return (
    <div>
      <h3>Edit your Profile</h3>
      <form onSubmit={(e) => handleSubmit(e)}>

        {userData.userId === id && <div>
          <label id='password'>Your current Password</label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          /></div>}

        {userData.userId === id &&
          <div>
            <label id='newpassword'>Change or confirm your password</label>
            <input
              type='password'
              name='newpassword'
              value={values.newpassword}
              onChange={handleChange}
            />
          </div>
        }
        <label id='firstname'>Your First name</label>
        <input
          type='text'
          name='name'
          placeholder={profileData.name}
          value={values.name}
          onChange={handleChange}
        />
        <label id='lastname'>Your Last name</label>
        <input
          type='text'
          name='lastname'
          placeholder={profileData.lastname}
          value={values.lastname}
          onChange={handleChange}
        />
        <label id='pseudo'>Your Username</label>
        <input
          type='text'
          name='pseudo'
          placeholder={profileData.pseudo}
          value={values.pseudo}
          onChange={handleChange}
        />
        <label id='phone'>Your Phone</label>
        <input
          type='tel'
          name='phone'
          placeholder={profileData.phone}
          value={values.phone}
          onChange={handleChange}
        />
        <label id="profilePic">Your profile picture</label>
          <input type='file' name='profilePic' accept=".png, .jpeg, .jpg" onChange={handleImageCover} />
        
        <img className="Profile_Pic" src={preview_profileImage} alt="profileImage" />
        <br/>
        <label id="CV_PDF">Your CV</label>
          <input type='file' name='CV_PDF' accept='.pdf' onChange={handleCV_PDF} />
        
        <embed src={preview_CV_PDF} />
        <br/>
        {userData.level >= 1 &&
          <select>
          </select>
        }

        <button type='submit'>Edit account!</button>

      </form>
    </div>
  )
}

export default EditProfileForm