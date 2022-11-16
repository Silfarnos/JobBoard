import NavBar from "../Components/Navbar";
import React, { useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import JobApplications from "../Components/jobApplications";

const OfferApplications = () => {
  let Offerid = window.location.pathname.split("/")[2];
  const [offer, setOffer] = React.useState([]);
  const [display, setDisplay] = React.useState(0);
  const [applications, setApplications] = React.useState([]);
  const [img, setImg] = React.useState("");
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
    return new Promise((res) => setTimeout(res, delay));
  }

  async function fetchData() {
    try {
      const result = await axios.get(`http://localhost:3000/api/offers/${Offerid}`);
      setOffer(result.data);
      setImg(`data:${result.data.creatorImageType};base64, ${Buffer.from(result.data.creatorImage.data).toString('base64')}`)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchApplicationData() {  
    try {
      const result = await axios.get(`http://localhost:3000/api/comment/offer/${Offerid}`, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        }
      });
      let applicationsInfo = result.data;
      async function addImage(applicationsInfo) {
        await applicationsInfo.forEach(element => {
          if(element.fileBuffer){
          element.img = `data:application/pdf;base64, ${Buffer.from(element.fileBuffer.data).toString('base64')}`
          }
        });
      }
      await addImage(applicationsInfo);
      setApplications(applicationsInfo);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let isCancelled = false
    let isCancelledApplications = false
    const handleChange = async () => {
      await timeout(10);
      if (!isCancelled) {
        await fetchData();
      }
    };
    handleChange();
    const handleChangeApplications = async () => {
      await timeout(10);
      if (!isCancelledApplications) {
        await fetchApplicationData();
      }
    };

    handleChangeApplications();
    return () => {
      isCancelled = true;
      isCancelledApplications = true;
    };
  }, []);

  const changeDisplay = (id) => {
    setDisplay(id);
  };
  return (
    <div>
      <NavBar />
      <h1>Offer Applications</h1>
      <div className="joboffers" key={offer._id}>
        <h1>{offer.title}</h1>
        <img src={img} alt="offerImage" />
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
      </div>
      <JobApplications applications = {applications}/>
    </div>
  );
}

export default OfferApplications;