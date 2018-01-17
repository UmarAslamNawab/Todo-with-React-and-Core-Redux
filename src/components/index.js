import React, { Component } from 'react'
import './index.css'
// import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Dashboard from './protected/dashboard'
import { logout } from './helpers/auth'
import { firebaseAuth } from './config/constants';
import {providerFb, providerGoogle, auth} from './fbClient';
import * as firebase from 'firebase';




// var config = firebase.initializeApp({
//     apiKey: "AIzaSyAUTWn2F8u3Q7oeYrYHp8OwsDajPk_RB-A",
//     authDomain: "test-01-141907.firebaseapp.com",
//     databaseURL: "https://test-01-141907.firebaseio.com",
//     storageBucket: "test-01-141907.appspot.com",
//     messagingSenderId: "906558294346"
// });

// firebase.initializeApp(config);




function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    user:null
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        
        
        })



      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }


  // async login() {
  //   const result = new auth().signInWithPopup(provider)
  //   this.setState({
  //     user: result.user,
  //     authed:true
    
  //   });
  // }



  // logout() {
  //   new auth().signOut()
  //   this.setState({user: null});
  // }


  render() {
    // const {user} = this.state

    return this.state.loading === true ? <h1>Loading</h1>
        : (
      <BrowserRouter>
        <div style={{  
  // background: 'url(3668.jpg) no-repeat center center fixed', 
 }}>
          <div className="navbar navbar-default navbar-static-top ">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand" ><h4>Todo App With Firebase Authentication</h4></Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <div> <button className="waves-effect waves-light btn"
                        // style={{border: 'none', background: '' , }}
                        onClick={() => {
                          logout()
                        }}
                        >Logout</button>

                        {/* <button onClick={this.logout.bind(this)}>
                          Logout
                         </button> */}
     
                      </div>
                 
                       
                    : <span>
                        <Link to="/login" className="waves-effect waves-light btn">Login</Link>
                      
                       
                       {/* //facebook login  */}
                        {/* <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p> */}
                       {/* <Link className=" waves-effect waves-light btn"  onClick={this.login.bind(this)}>
                       Login with Facebook
                       </Link> */}











                        <Link to="/signup" className="waves-effect waves-light btn">Signup</Link>
                      </span>
                    
                    }
                       </li>
                        </ul>
                       </div>
                     </div> 
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact component={Home} />
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/signup' component={Signup} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}