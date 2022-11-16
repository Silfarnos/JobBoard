import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer';
import NavBarAdm from './NavBarAdm';
import NavBarUsr from './NavBarUsr';
import NavBarGuest from './NavBarGuest';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'))
  let [userInfo, setUserInfo] = useState({})
  
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function fetchData(data) {
    try {
      let result = await axios.get(`http://localhost:3000/api/auth/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      });
      userInfo = result.data
      let name = result.data.name[0]
      let lastname = result.data.lastname[0]
      userInfo.initials = (name + lastname).toUpperCase()
      userInfo.preview_profileImage = `data:${result.data.profileImageType};base64, ${Buffer.from(result.data.profileImageBuffer.data).toString('base64')}`
      setUserInfo(userInfo)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        if (!user) {
          return
        }
        fetchData(user);
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, []);


  var display = 'guest'
  var admin = false

  if (!localStorage.getItem('user')) {
    display = 'guest'
  } else if (JSON.parse(localStorage.getItem('user')).level >= 1) {
    display = 'admin'
  } else {
    display = 'user'
  }

  return (
    <div>
      {display === 'admin' && <NavBarAdm props = {userInfo}/>}
      {display === 'user' && <NavBarUsr props = {userInfo}/>}
      {display === 'guest' && <NavBarGuest />}
      {/* <h1 className='siteLogo'><Link to='/'>Placeholder Site Title</Link></h1>
      <Link to='/'>Home</Link>

      {display === 'user' && <Link to='/Profile'>Profile</Link>}
      {display === 'user'  && <Link to='/CreatePost'>Create a new Post !</Link>}

      {display === 'notlogged' && <Link to='/SignUp'>Signup</Link>}
      {display === 'notlogged' && <Link to='/FormLogin' state={"login"}>LogIn</Link>}
      {display === 'user' && <img className = "Profile_Pic" src={preview_profileImage} alt="profileImage" />}
      {display === 'user' && <Link to='/FormLogin' state={"logout"}>Log out</Link>} */}
    </div>
  )
}

export default NavBar