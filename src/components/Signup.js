// import React, { Component } from 'react';
// import Form from './Form.js';
// import * as firebase from 'firebase';

// class Signup extends Component {
//     constructor(props) {
//         super(props);
//         this.signup = this.signup.bind(this);
//     }

//     signup(credentials) {
//         console.log(credentials);
//         firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
//             .then((user) => {
//                 console.log(user, 'user');
//             })
//             .catch(function (error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//             });
//     }

//     render() {
//         return (
//             <div>
//                 <h2 className='heading-2'>Signup</h2>
//                 <Form formhandler={this.signup}></Form>
//             </div>
//         );
//     }
// }

// export default Signup;







import React, { Component } from 'react'
import { auth } from './helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Signup extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}

