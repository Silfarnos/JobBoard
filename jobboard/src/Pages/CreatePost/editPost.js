import axios from 'axios';
import { Link } from 'react-router-dom';
import React from 'react';


class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      wages: '',
      location: '',
      workingTime: '',
      contractType: '',
      description: '',
      shortDecription: '',
      firstQuestion: '',
      secondQuestion: '',
      thirdQuestion: '',
      keywords: [],
      id: window.location.pathname.split('/')[2],
      user: JSON.parse(localStorage.getItem('user')),
      token: JSON.parse(localStorage.getItem('user')).token
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async fetchJobOffers() {
    try {

      let offer = await axios.get(`http://localhost:3000/api/offers/${this.state.id}`, {
        headers: {
          authorization: `Bearer ${this.state.user.token}`
        }
      })
      this.setState({
        title: offer.data.title,
        wages: offer.data.wages,
        location: offer.data.location,
        workingTime: offer.data.workingTime,
        contractType: offer.data.contractType,
        description: offer.data.description,
        shortDecription: offer.data.shortDecription,
        firstQuestion: offer.data.firstQuestion,
        secondQuestion: offer.data.secondQuestion,
        thirdQuestion: offer.data.thirdQuestion,
        keywords: offer.data.keywords,
        creatorId: offer.data.creatorId,
        id: window.location.pathname.split('/')[2],
        user: JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('user')).token
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.fetchJobOffers()
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = this.state;
    this.updateOffer(data)
  }
  async updateOffer(data) {
    try {
      let newOffer = {
        title: data.title,
        wages: data.wages,
        location: data.location,
        workingTime: data.workingTime,
        contractType: data.contractType,
        description: data.description,
        shortDecription: data.shortDecription,
        firstQuestion: data.firstQuestion,
        secondQuestion: data.secondQuestion,
        thirdQuestion: data.thirdQuestion,
        keywords: data.keywords,
      }

      let offer = await axios.put(`http://localhost:3000/api/offers/${this.state.id}`, newOffer, {
        headers: {
          authorization: `Bearer ${this.state.token}`
        }
      })
      alert(offer.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    return (
      <div>
        <Link to='/' >Back to Home</Link>
        <div>
          <h1>UpdatePost</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label>
              Wages:
              <input type="text" name="wages" value={this.state.wages} onChange={this.handleChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={this.state.location} onChange={this.handleChange} />
            </label>
            <label>
              WorkingTime:
              <input type="text" name="workingTime" value={this.state.workingTime} onChange={this.handleChange} />
            </label>
            <label>
              ContractType:
              <input type="text" name="contractType" value={this.state.contractType} onChange={this.handleChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
            </label>
            <label>
              ShortDecription:
              <input type="text" name="shortDecription" value={this.state.shortDecription} onChange={this.handleChange} />
            </label>
            <label>
              FirstQuestion:
              <input type="text" name="firstQuestion" value={this.state.firstQuestion} onChange={this.handleChange} />
            </label>
            <label>
              SecondQuestion:
              <input type="text" name="secondQuestion" value={this.state.secondQuestion} onChange={this.handleChange} />
            </label>
            <label>
              ThirdQuestion:
              <input type="text" name="thirdQuestion" value={this.state.thirdQuestion} onChange={this.handleChange} />
            </label>
            <label>
              Keywords:
              <input type="text" name="keywords" value={this.state.keywords} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
export default EditPost;