import axios from 'axios';
import React from 'react'

class CreatePost extends React.Component {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('user'));
    const data = this.state;
    data.creatorId = user.userId;
    data.creatorName = user.name;
    const UrlApi = axios.create({
      baseURL: "http://localhost:3000/api/"
    });
    UrlApi.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    UrlApi.post("/offers/", data)
      .then(res => {
        alert(res.data.message)
      })
      .catch(err => {
        console.log(err)
      })  
  }

  render() {
    return (
      <div>
        <h1>CreatePost</h1>
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
    )
  }
}

export default CreatePost
