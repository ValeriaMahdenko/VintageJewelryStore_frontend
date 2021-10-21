import React, { Component } from 'react';
import './style/register.css'
import 'axios'
import axios from 'axios';
import swal from "sweetalert";

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);
    this.state = { Name: "", Surname: "", Phone: "", Country: "UA", City: "", Street: "", Email: "", Password: "" };
  }

  setName(n ) {
    this.setState({ Name: n})
  }
  
  setSurname(s ) {
    this.setState({ Surname: s})
  }
  
  setPhone(p ) {
    this.setState({ Phone: p})
  }
  
  setCountry(c ) {
    this.setState({ Country: c})
  }

  setCity(c ) {
    this.setState({ City: c})
  }
  
  setStreet(s ) {
    this.setState({ Street: s})
  }

  setEmail(em ) {
    this.setState({ Email: em})
  }
  
  setPassword(pass ) {
    this.setState({ Password: pass})
  }

  Signup(e){
      e.preventDefault();
      axios.post("http://127.0.0.1:8000/users/register/", {
        "first_name": this.state.Name,
        "last_name": this.state.Surname,
        "email": this.state.Email,
        "password": this.state.Password,
        "country":  this.state.Country,
        "city":  this.state.City,
        "street":  this.state.Street,
        "phone":  this.state.Phone
    }).then(function(response) {
      swal({
        title: "Your order has been accepted!",
        icon: "success",
        text: "We have sent a letter to your mail. You must confirm your actions to be able to log in our store.",
        button: 'OK',
      }).then(function(isConfirm) {
        if (isConfirm) {
          window.location.href = "/login";
        } 
      });
      
    })
}


  render () {
    return (
      <div>
      <h2>Registration</h2>
    <div class="register">
            <label>Name</label>
            <input type="text" name="UserName" id="UserName" value={this.state.Name} onChange={e=>this.setName(e.target.value)} placeholder="Name"/>
            <br></br>
            <label>Surname</label>
            <input type="text" name="UserSurname" id="UserSurname" value={this.state.Surname} onChange={e=>this.setSurname(e.target.value)} placeholder="Surname"/>
            <br></br>
            <label>Phone</label>
            <input type="text" name="UserPhone" id="UserPhone" value={this.state.Phone} onChange={e=>this.setPhone(e.target.value)} placeholder="Phone"/>
            <br></br>
            <label>Country</label>
            <select name="UserCountry" value={this.state.Country} onChange={e=>this.setCountry(e.target.value)}>
                <option selected="">(Please select a country)</option>
                <option value="UA">Ukraine</option>
                <option value="PL">Poland</option>
                <option value="CZ">Czech Republic</option>
                <option value="AS">Hungary</option>
            </select>
            <br></br>
            <label>City</label>
            <input type="text" name="UserCity" id="UserCity" value={this.state.City} onChange={e=>this.setCity(e.target.value)} placeholder="City"/>
            <br></br>
            <label>Street</label>
            <input type="text" name="UserStreet" id="UserStreet" value={this.state.Street} onChange={e=>this.setStreet(e.target.value)} placeholder="Street"/>
            <br></br>
            <label>Email</label>
            <input type="text" name="UserEmail" id="UserEmail" value={this.state.Email} onChange={e=>this.setEmail(e.target.value)} placeholder="Email"/>
            <br></br>
            <label>Password</label>
            <input type="Password" name="Pass" id="Pass" value={this.state.Password} onChange={e=>this.setPassword(e.target.value)} placeholder="Password"/>
            <br></br>
            <button type="button" name="log" id="log" onClick={e => this.Signup(e)} >Log up</button>
            <br></br>
    </div>
    </div>
    );
  }
}
