import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const YourJobOfferList = (props) => {

  const offers = props.offers;

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/offers/delete/${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
      }
      )
      alert('Offer sucessfully Deleted!')
      props.reRender()
    } catch (error) {
      console.log(error)
    }
  }

  const changeDisplay = (id) => {
    setDisplay(id);
  };

  return (
    <div>
      {offers.map((offer) =>
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
            <Link to={`/application/${offer._id}`}  ><button> see Applications</button></Link>
          </div>}
        </div>
      )}
    </div>
  )
}


export default YourJobOfferList