import axios from 'axios';
import React, { Component } from 'react';

export class Account extends Component {
  static displayName = Account.name;

  constructor(props) {
    super(props);
    this.state = { Name: "", Surname: "", Country: "", Phone: "", City: "", Street: "", Email: "", Password: "", IsAdmin: false};

    axios.get("http://127.0.0.1:8000/users/", { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {this.setState({ 
          Name: response.data.first_name,
          Surname: response.data.last_name,
          Country: response.data.country,
          Phone: response.data.phone,
          City: response.data.city,
          Street: response.data.street,
          Email: response.data.email,
          IsAdmin: response.data.is_admin
      })}
      )
  }
  setEmail(em ) {
    this.setState({ Email: em})
  }
  
  setName(n ) {
    this.setState({ Name: n})
  }

  setCounty(c)
  {
      this.setState({Country: c})
  }


  /*setEmail(em ) {
    this.setState({ Email: em})
  }
  
  setPassword(pass ) {
    this.setState({ Password: pass})
  }
  setEmail(em ) {
    this.setState({ Email: em})
  }
  setPassword(pass ) {
    this.setState({ Password: pass})
  }
  setEmail(em ) {
    this.setState({ Email: em})
  }*/
  
  

  Update(e)
  {
      e.preventDefault();
      axios.put("http://127.0.0.1:8000/users/", 
      {"country": this.state.Country,
        "first_name": this.state.Name,
        "last_name": this.state.Surname,
        "email": this.state.Email,
        "city": this.state.City,
        "street": this.state.Street,
        "phone": this.state.Phone},
      { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`}}


        /*{"country": this.state.Country,
        "first_name": this.state.Name,
        "last_name": this.state.Surname,
        "email": this.state.Email,
        "city": this.state.City,
        "street": this.state.Street,
        "phone": this.state.Phone}*/
    )
  }

  render () {
    return (
      <div>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
                        width="150px"
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/><span
                        class="text-black-50" >{this.state.Name} {this.state.Surname}</span><span
                        class="text-black-50">{this.state.Email}</span>
                         { this.state.IsAdmin && <span class="text-black-50"> Admin 
                        
                             </span> }
                        </div>

            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" value={this.state.Name} onChange={e=> this.setName(e.target.value)}
                                placeholder="Name"/></div>
                        <div class="col-md-6"><label class="labels">Surname</label><input type="text"
                                class="form-control" value={this.state.Surname} placeholder="Surname"/></div>
                    </div>
                    <div class="row mt-3">
                        <label class="labels">Phone</label><input type="text"
                                class="form-control" value={this.state.Phone} placeholder="Phone number"/>
                        <label class="labels">Country</label>
                        <select name="UserCountry" class="form-control" onChange={e=> this.setCounty(e.target.value)}>
                                <option value={this.state.Country}>(Please select a country)</option>
                                <option value="UA">Ukraine</option>
                                <option value="PL">Poland</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="AS">Hungary</option>
                        </select> <br></br>
                        <label class="labels">City</label><input type="text"
                                class="form-control" value={this.state.City} placeholder="City"/>
                        <label class="labels">Street</label><input type="text"
                                class="form-control" value={this.state.Street} placeholder="Street"/>
                        <label class="labels">Email</label><input type="text"
                                class="form-control" value={this.state.Email} placeholder="Email" />
                    </div>
                    <div class="mt-5 text-right">
                        <button class="btn-primary text-right" type="button" onClick={e=> this.Update(e)}> Update </button>
                    </div>
                </div>
            </div>
            
        </div>
        {this.state.IsAdmin && <button onClick={ e => { e.preventDefault(); this.props.history.push("/add")}}>ADD</button>}
    </div>
    </div>
    );
  }
}
