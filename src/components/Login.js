import axios from 'axios';
import React, { Component } from 'react';
import { Redirect, useHistory } from 'react-router';
import './style/login.css'

export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = { Email: "", Password: "", Redirect: false };
  }

  setEmail(em ) {
    this.setState({ Email: em})
  }
  
  setPassword(pass ) {
    this.setState({ Password: pass})
  }

  GetUserToken()
  {
    axios.get("http://127.0.0.1:8000/users/", { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {localStorage.setItem("Id", response.data.id); localStorage.setItem("IsAdmin", response.data.is_admin); localStorage.setItem("IsLogin", true)}
      )
  }

  Signin(e){
    e.preventDefault();
      axios.post("http://127.0.0.1:8000/users/login/", {
        "email": this.state.Email,
        "password": this.state.Password,
    }).then(response => localStorage.setItem("Token", response.data.access))

    this.GetUserToken();

    this.setState({Redirect: true});

  }
  
  Signout(e)
  {
    e.preventDefault();
    localStorage.setItem("IsLogin", false);
    localStorage.setItem("Token", "");
    localStorage.setItem("Id", 0);
    localStorage.setItem("IsAdmin", false);

    this.GetUserToken();

    this.setState({Redirect: true});
  }
  render () {
    return (
      <div>
      <h2>Login Page</h2><br></br>
    <div class="login">
        <p>Not a member?
            <a href="/register">Log up now</a>
        </p>
        <form id="login">
            <label>Email</label>
            <input type="text" name="UserEmail" id="UserEmail" value={this.state.Email} onChange={e=>this.setEmail(e.target.value)} placeholder="Email" />
            <br></br>

            <label>Password</label>
            <input type="Password" name="Pass" id="Pass" value={this.state.Password} onChange={e=>this.setPassword(e.target.value)} placeholder="Password"/>

            <br></br>
            <button type="button" name="log" id="log" onClick={e => this.Signin(e)}>Log in</button>
            <br></br>

            <button type="button" name="log" id="logout" onClick={e => this.Signout(e)}>Sign out</button>

         {this.state.Redirect && <Redirect to={"/"}/>}
        </form>

        </div>
    </div>
    );
  }
}
