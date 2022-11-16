import axios from 'axios'
import { Buffer } from 'buffer';
import React from 'react';
import NavBar from '../Components/Navbar';


class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      description: 'Describe your application here',
      creatorId: '',
      createTime: '',
      updateTime: '',
      offerId: '',
      fileBuffer: '',
      preview_CV_PDF: '',
      CV_PDF: '',
      firstQuestionAnswer: '',
      secondQuestionAnswer: '',
      thirdQuestionAnswer: '',
      creatorName: '',
      creatorLastName: '',
      creatorEmail: '',
      creatorPhone: '',
      offer_id: '',
      offer_title: '',
      offer_wages: '',
      offer_location: '',
      offer_workingTime: '',
      offer_contractType: '',
      offer_description: '',
      offer_firstQuestion: '',
      offer_secondQuestion: '',
      offer_thirdQuestion: '',
      id: window.location.pathname.split('/')[2],
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchUserInfo(data) {
    if (data == null) return
    try {
      const info = await axios.get(`http://localhost:3000/api/auth/${data.userId}`, {
        headers: {
          authorization: `Bearer ${data.token}`
        }
      })
      this.setState({
        creatorName: info.data.name,
        creatorLastName: info.data.lastname,
        creatorEmail: info.data.email,
        creatorPhone: info.data.phone,
      })
      if (info.data.CV_Buffer) {
        this.setState({
          preview_CV_PDF: (`data:application/pdf;base64, ${Buffer.from(info.data.CV_Buffer.data).toString('base64')}`),
          fileBuffer: info.data.CV_Buffer.data
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  async fetchOfferInfo(data) {
    try {
      let offer = await axios.get(`http://localhost:3000/api/offers/${data}`);
      this.setState({
        offer_title: offer.data.title,
        offer_wages: offer.data.wages,
        offer_location: offer.data.location,
        offer_workingTime: offer.data.workingTime,
        offer_contractType: offer.data.contractType,
        offer_description: offer.data.description,
        offer_firstQuestion: offer.data.firstQuestion,
        offer_secondQuestion: offer.data.secondQuestion,
        offer_thirdQuestion: offer.data.thirdQuestion,
      })
    } catch (error) {
      console.log(error)
      this.setState({ display: false })
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user') != null) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.setState({ user: user })
      this.fetchUserInfo(user);
    }
    this.fetchOfferInfo(this.state.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendComment();
  }
  async sendComment() {
    const formData = new FormData()
    if (this.state.CV_PDF == '' && this.state.fileBuffer !== '') {
      formData.append('CV_PDF', this.state.fileBuffer)
    }
    if (this.state.CV_PDF !== '') {
      formData.append('CV_PDF', this.state.CV_PDF)
    }
    formData.append('description', this.state.description)
    formData.append('offerId', this.state.id)
    if (localStorage.getItem('user') != null) {
      formData.append('creatorId', JSON.parse(localStorage.getItem('user')).userId)
    }
    formData.append('creatorName', this.state.creatorName)
    formData.append('creatorLastName', this.state.creatorLastName)
    formData.append('creatorEmail', this.state.creatorEmail)
    formData.append('creatorPhone', this.state.creatorPhone)
    formData.append('firstQuestionAnswer', this.state.firstQuestionAnswer)
    formData.append('secondQuestionAnswer', this.state.secondQuestionAnswer)
    formData.append('thirdQuestionAnswer', this.state.thirdQuestionAnswer)
    let res = await axios.post(`http://localhost:3000/api/comment/${this.state.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    alert(res.data.message)
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCV_PDF = (e) => {
    this.setState({ CV_PDF: e.target.files[0] })
    this.setState({ preview_CV_PDF: URL.createObjectURL(e.target.files[0]) })
  }
  render() {
    return (
      <div>
        <NavBar />
        {this.state.display === false && <h1>404 Comment does not exist!</h1>}
        {this.state.display === true &&
          <div>
            <div className="joboffers" key={this.state.offer_id}>
              <h1>{this.state.offer_title}</h1>
              <p>Wage : {this.state.offer_wages}</p>
              <p>Location : {this.state.offer_location}</p>
              <p>Working Time :{this.state.offer_workingTime}</p>
              <p >Contract Type : {this.state.offer_contractType}</p>
              <p>{this.state.offer_description}</p>
              <p>{this.state.offer_firstQuestion}</p>
              <p>{this.state.offer_secondQuestion}</p>
              <p>{this.state.offer_thirdQuestion}</p>
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <label>
                Your application:
                <textarea name="description" onChange={this.handleChange} value={this.state.description}></textarea>
              </label>
              <label>
                Your name:
                <input type="text" name="creatorName" value={this.state.creatorName} onChange={this.handleChange} />
              </label>
              <label>
                Your last name:
                <input type="text" name="creatorLastName" value={this.state.creatorLastName} onChange={this.handleChange} />
              </label>
              <label>
                Your email:
                <input type="text" name="creatorEmail" value={this.state.creatorEmail} onChange={this.handleChange} />
              </label>
              <label>
                Your phone:
                <input type="text" name="creatorPhone" value={this.state.creatorPhone} onChange={this.handleChange} />
              </label>
              <label>
                Your answer to the first question:
                <input type="text" name="firstQuestionAnswer" onChange={this.handleChange} value={this.state.firstQuestionAnswer} />
              </label>
              <label>
                Your answer to the second question:
                <input type="text" name="secondQuestionAnswer" value={this.state.secondQuestionAnswer} onChange={this.handleChange} />
              </label>
              <label>
                Your answer to the third question:
                <input type="text" name="thirdQuestionAnswer" value={this.state.thirdQuestionAnswer} onChange={this.handleChange} />
              </label>
              <label id="CV_PDF">
                Your CV:
                <input type='file' name='CV_PDF' accept='.pdf' onChange={this.handleCV_PDF} />
              </label>
              <embed src={this.state.preview_CV_PDF} />
              <input type="submit" value="Submit" />
            </form>
          </div>
        }
      </div>
    )
  }
}

export default CreateComment

