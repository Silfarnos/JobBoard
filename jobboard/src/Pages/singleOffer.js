import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';
import NavBar from "../Components/Navbar";
import { Link } from "react-router-dom";

function SingleOffer() {
  let Offerid = window.location.pathname.split("/")[2];
  const [offer, setOffer] = useState([]);
  const [display, setDisplay] = React.useState(0);
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
    return new Promise(res => setTimeout(res, delay));
  }
  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:3000/api/offers/${Offerid}`);
      let offer = result.data;
      offer.img = `data:${result.data.creatorImageType};base64, ${Buffer.from(result.data.creatorImage.data).toString('base64')}`
      setOffer(offer);
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/offers/delete/${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      }
      )
      alert('Offer sucessfully Deleted!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        fetchData();
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, []);
  const changeDisplay = (id) => {
    setDisplay(id);
  };

  return (
    <div>
      <NavBar />
      <div className="joboffers" key={offer._id}>
          <h1>{offer.title}</h1>
          <img src={offer.img} alt="offerImage" />
          {display === offer._id && <p>Wage : {offer.wages}</p>}
          {display === offer._id && <p>Location : {offer.location}</p>}
          {display === offer._id && <p>Working Time :{offer.workingTime}</p>}
          {display === offer._id && <p >Contract Type : {offer.contractType}</p>}
          {display === offer._id && <p>{offer.description}</p>}
          {display !== offer._id && <p>{offer.shortDecription}</p>}
          {display === offer._id && <p>{offer.firstQuestion}</p>}
          {display === offer._id && <p>{offer.secondQuestion}</p>}
          {display === offer._id && <p>{offer.thirdQuestion}</p>}
          {display !== offer._id && <p ><span className="pointer underline" onClick={() => changeDisplay(offer._id)}>Show more</span></p>}
          {display === offer._id && <p ><span className="pointer underline" onClick={() => changeDisplay(0)}>Show less </span></p>}
          {(user.userId === offer.creatorId || user.level >= 1) && <div>
            <Link to={`/editPost/${offer._id}`} ><button>Edit</button></Link>
            <button className='pointer' onClick={() => { handleDelete(offer._id) }}>DELETE</button>
          </div>}
          <Link to={`/CreateComment/${offer._id}`} >Apply to the offer</Link>
        </div>
    </div>
  );
}
export default SingleOffer;