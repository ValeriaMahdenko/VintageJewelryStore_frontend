import React, { Component } from 'react';

export class Account extends Component {
  static displayName = Account.name;
  render () {
    return (
      <div>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
                        width="150px"
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"/><span
                        class="font-weight-bold">UserName</span><span
                        class="text-black-50">UserEmail</span><span> </span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control"
                                placeholder="Name"/></div>
                        <div class="col-md-6"><label class="labels">Surname</label><input type="text"
                                class="form-control" placeholder="Surname"/></div>
                    </div>
                    <div class="row mt-3">
                        <label class="labels">Phone</label><input type="text"
                                class="form-control" placeholder="Phone number"/>
                        <label class="labels">Country</label>
                        <select name="UserCountry" class="form-control" >
                                <option selected="">(Please select a country)</option>
                                <option value="UA">Ukraine</option>
                                <option value="PL">Poland</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="AS">Hungary</option>
                        </select> <br></br>
                        <label class="labels">City</label><input type="text"
                                class="form-control" placeholder="City"/>
                        <label class="labels">Street</label><input type="text"
                                class="form-control" placeholder="Street"/>
                        <label class="labels">Email</label><input type="text"
                                class="form-control" placeholder="Email" value=""/>
                    </div>
                    <div class="mt-5 text-right">
                        <button class="btn-primary text-right" type="button"> Update </button>
                        <button class="btn-primary text-left" type="button"> Cancel </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
  }
}
