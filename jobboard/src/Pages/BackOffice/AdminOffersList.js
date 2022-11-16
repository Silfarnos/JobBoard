import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

function AdminOffersList(props) {
  const offers = props.offers;
  const userlevel = props.level;
  const [display, setDisplay] = React.useState(0);

  const handleDelete = async (_id) => {
    if (userlevel >= 1) {
      try {
        let res = await axios.delete(`http://localhost:3000/api/offers/delete/${_id}`, {
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
    else {
      alert('You lack permissions!')
    }
  }

  const changeDisplay = (id) => {
    setDisplay(id);
  };

  return (
    <div>
      {offers.map((offer) =>
        <div className="joboffers" key={offer._id}>
          title : {offer.title}
          wage : {offer.wage}
          location : {offer.location}
          working time : {offer.workingTime}
          contract type : {offer.constractType}
          {display === offer._id && <p>{offer.description}</p>}
          {display !== offer._id && <p>{offer.shortDecription}</p>}
          {offer.firstQuestion}
          {offer.secondQuestion}
          {offer.thirdQuestion}
          {display !== offer._id && <p ><span className="pointer underline" onClick={() => changeDisplay(offer._id)}>Show more</span></p>}
          {display === offer._id && <p ><span className="pointer underline" onClick={() => changeDisplay(0)}>Show less </span></p>}
          <Link to={`/editPost/${offer._id}`}><button>Edit</button></Link>
          <button className='pointer' onClick={() => { handleDelete(offer._id) }}>DELETE</button>
        </div>
      )}
    </div>
  )
}

export default AdminOffersList