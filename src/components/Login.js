// import React, { Component } from 'react';
// import Form from './Form.js';
// import { connect } from 'react-redux';
// import {
//   authentication
// } from '../modules/todoredux.js';
// import * as firebase from 'firebase';
// import { browserHistory } from 'react-router';

// class Login extends Component {

//   constructor(props) {
//     super(props);
//     this.login = this.login.bind(this);
//     const {
//       auth
//     } = this.props
//     console.log(auth, '+++++++++++++');
//   }

//   login(credentials) {
//     firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then((user) => {
//         this.props.authentication();
//         browserHistory.push('/home');
//       })
//       .catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//       });
//   }

//   render() {
//     return (
//       <div>
//         <h2 className='heading-2'>Login</h2>
//         <Form formhandler={this.login}></Form>
//       </div>
//     );
//   }
// }


// module.exports = connect(state => ({
//   auth: state.todo.authenticated
// }), {
//     authentication
//   })(Login)




import React, { Component } from 'react'
import { login, resetPassword } from './helpers/auth'
import { auth, providerFb , providerGoogle } from './fbClient'
// import * as FontAwesome from 'react-icons/fa'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaGoogle from 'react-icons/lib/fa/google'



function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {



  async loginFb() {
    const result1 = new auth().signInWithPopup(providerFb)
    this.setState({
      user: result1.user,
      authed:true
    
    });
  }


  async loginGoogle() {
    const result2= new auth().signInWithPopup(providerGoogle)
    this.setState({
      user: result2.user,
      authed:true
    
    });
  }

//google




  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }




  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
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
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
          <a style={{marginLeft:'50px', color:'blue'}} onClick={this.loginFb.bind(this)}><FaFacebook /> </a>
          <a style={{marginLeft:'50px', color:"red"}} onClick={this.loginGoogle.bind(this)}><FaGoogle /> </a>


        </form>
{/* 
          <button type="submit" className=" waves-effect waves-light btn"  onClick={this.login.bind(this)}>
                       Login with Facebook
                       </button> */}
                      
           {/* <a  onClick={this.login.bind(this)}><FaFacebook /> </a> */}
                       

      </div>

      
    )
  }
}
