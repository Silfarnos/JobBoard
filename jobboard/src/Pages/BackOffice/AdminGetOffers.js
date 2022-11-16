import JobOfferList from '../../Components/jobOffer';
import axios from "axios";
import React, { useState, useEffect } from "react";
import AdminOffersList from './AdminOffersList';

function AdminGetOffers(props) {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(1);
  const [totalOffers, setTotalOffers] = useState(0);
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
      let skip = (element - 1) * 10;
      const result = await axios.get(`http://localhost:3000/api/offers/getsomeoffers/${skip}`);
      setOffers(result.data);
    } catch (error) {
      console.log(error)
    }
  }
  async function fetchTotalOffers() {
    try {

      let totalOffers = await axios.get("http://localhost:3000/api/offers/count/");
      setTotalOffers(totalOffers.data);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let isCancelledCounter = false;
    let isCancelleOffers = false;
    const handleChangeCounter = async () => {
      await timeout(10);
      if (!isCancelledCounter) {
        fetchTotalOffers();
      }
    };
    handleChangeCounter();
    const handleChangeOffers = async (data) => {
      await timeout(10);
      if (!isCancelleOffers) {
        fetchData(data);
      }
    };
    handleChangeOffers(count);
    return () => {
      isCancelledCounter = true;
      isCancelleOffers = true;
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

  async function fetchNewDataIncreased(count, totalOffers) {

    if ((count * 10) >= 10 * Math.ceil(totalOffers / 10)) {
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
        <span className="pointer" onClick={() => fetchNewDataIncreased(count, totalOffers)}>{'>'}</span>
      </div>
      <AdminOffersList offers={offers} level={level} reRender={reRender}/>
    </div>
  )
}

export default AdminGetOffers