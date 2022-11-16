import React, { useEffect, useState } from 'react'
import NotLoggedIn from './Profile/NotLoggedIn'
import axios from 'axios'
import NavBar from '../Components/Navbar'
import YourJobOfferList from '../Components/yourJobOfferList'
import { Buffer } from 'buffer'

function UserOffers() {
  const [offers, setOffers] = React.useState([])
  const [count, setCount] = React.useState(1)
  const [totalOffers, setTotalOffers] = React.useState(0)
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
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay))
  }

  async function fetchData(element) {
    try {
      let skip = (element - 1) * 10
      const result = await axios.get(`http://localhost:3000/api/offers/user/getsomeoffers/${skip}`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
        }
      })
      let offer = result.data;
      async function addImage(offer){
        await offer.forEach(element => {
          element.img = `data:${element.creatorImageType};base64, ${Buffer.from(element.creatorImage.data).toString('base64')}`
        });
      }
      await addImage(offer);
      setOffers(offer);
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchTotalOffers() {
    try {
      let totalOffers = await axios.get(`http://localhost:3000/api/offers/user/getsomeoffers/count`, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
        }
      });
      setTotalOffers(totalOffers.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelled = false
    let isCancelledCounter = false
    const handleChangeCounter = async () => {
      await timeout(10)
      if (!isCancelledCounter) {
        fetchTotalOffers()
      }
    }
    handleChangeCounter()

    const handleChangeOffers = async (data) => {
      await timeout(10)
      if (!isCancelled) {
        fetchData(data)
      }
    }
    handleChangeOffers(count)
    return () => {
      isCancelled = true
      isCancelledCounter = true
    }
  }, [render])
  async function fetchNewDataDecreased(count){

    setCount(count -1)

    if (count-1 === 0 ){
      setCount (1)
      return
    }

    await fetchData(count -1)
  }

  async function fetchNewDataIncreased(count, totalOffers){
    if((count*10) >= 10*Math.ceil(totalOffers/10)){
      return
    }
    setCount(count + 1)
    await fetchData(count + 1)
  }

  return (
    <div>
      <NavBar />
      {display === 'true' &&
        <div>
      <div className='counter'>
        <span className = "pointer" onClick={() => fetchNewDataDecreased(count)}>{'<'}</span>
        <span>{count}</span>
        <span className = "pointer" onClick={() => fetchNewDataIncreased(count, totalOffers)}>{'>'}</span>
      </div>
          <h1>My Offers</h1>
          <YourJobOfferList offers={offers} reRender={reRender} />
        </div>}
      {display === 'false' && <NotLoggedIn />}
    </div>
  )
}


export default UserOffers