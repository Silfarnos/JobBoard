
const JobApplications = (props) => {
  const applications = props.applications;
  return (
    <div>
      {applications.map((application) =>
        <div className="joboffers" key={application._id}>
          {application.img && <embed src={application.img }alt="application_CV_PDF" />}
          <p>{application.creatorName}</p>
          <p>{application.creatorLastName}</p>
          <p>{application.creatorEmail}</p>
          <p>{application.creatorPhone}</p>
          <p>{application.description}</p>
          <p>{application.firstQuestionAnswer}</p>
          <p>{application.secondQuestionAnswer}</p>
          <p>{application.thirdQuestionAnswer}</p>
        </div>
      )}
    </div>
  )
}

export default JobApplications