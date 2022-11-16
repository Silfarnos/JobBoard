import React from 'react'
import { Link } from 'react-router-dom'

function EmailNotVerified() {
  return (
    <div>
      <h4>Please verify your email to create job offers!</h4>
      <p>Don't find the email? Head to your <Link to='/Profile'>profile</Link> and click "verify email!"</p>
    </div>
  )
}

export default EmailNotVerified