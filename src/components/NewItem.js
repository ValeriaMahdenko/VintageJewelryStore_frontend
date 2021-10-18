import React, { Component } from 'react';
import './style/newitem.css'
import axios from "axios";
import swal from "sweetalert";
import FormData from 'form-data'

export class NewItem extends Component {
  static displayName = NewItem.name;

  constructor(props) {
    super(props);
    this.state = { Name: "", BrandName: "", Material: "", Price: "", Amount: "", Description: "", Images: [] }

  };
  
  setName(n ) {
    this.setState({ Name: n})
  }

  setBrandName(b ) {
    this.setState({ BrandName: b})
  }

  setMaterial(m ) {
    this.setState({ Material: m})
  }

  setPrice(p ) {
    this.setState({ Price: p})
  }

  setAmount(a ) {
    this.setState({ Amount: a})
  }

  setDescription(d ) {
    this.setState({ Description: d})
  }

  setImages(i ) {
    console.log(i);
    this.setState({ Images: i})
  }

AddItem(e){
  e.preventDefault();
  var headers= {
      "Content-Type": "multipart/form-data",
      "Authorization" : `Bearer ${localStorage["Token"]}`
    };

  var formData = new FormData();
  formData.append("name", this.state.Name);
  formData.append("brand_name", this.state.BrandName);
  formData.append("description", this.state.Description);
  formData.append("material", this.state.Material);
  formData.append("amount", this.state.Amount);
  formData.append("price", this.state.Price);

  for(var i of document.getElementById("files").files)
  {
    formData.append("image", i);
  }
  
  for(var pair of formData.entries()) {
    console.log(pair[0]+', '+pair[1]);
  } 

  axios.post(" http://127.0.0.1:8000/refresh_products/", formData,
  { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`, "Content-Type": "multipart/form-data"}
  }).then(function(response) {
    swal({
      title: "Success",
      text: "You have created a new item! We can watch this in main page.",
      icon: "success",
      button: "OK"
    });
    

    //this.props.history.push("/");
    console.log(response);
  })
  .catch(function(response) {
    swal({
      title: "Error",
      text: `${response}`,
      icon: "error",
      button: "Try again"
    });
  });
};


  render () {
    return (
      <div className="NewItem">
      <h3>New item</h3>
      <div class="container">
        <form enctype="multipart/form-data">
            <label for="name">Name</label>
            <input type="text" id="name" name="Name" value={this.state.Name} onChange={e=> this.setName(e.target.value)} placeholder="Name" required/>

            <label for="bname">Brandname</label>
            <input type="text" id="bname" name="brandname" value={this.state.BrandName} onChange={e=> this.setBrandName(e.target.value)} placeholder="Brandname" required/>

            <label for="material">Material</label>
            <input type="text" id="material" name="material" value={this.state.Material} onChange={e=> this.setMaterial(e.target.value)} placeholder="Material" required/>
            
            <label for="price">Price</label>
            <input type="text" id="price" name="price" value={this.state.Price} onChange={e=> this.setPrice(e.target.value)} placeholder="Price" required/>

            <label for="amount">Amount</label>
            <input type="text" id="amount" name="amount" value={this.state.Amount} onChange={e=> this.setAmount(e.target.value)} placeholder="Amount" required/>

            <label for="description">Description</label>
            <textarea id="description" name="description" value={this.state.Description} onChange={e=> this.setDescription(e.target.value)} placeholder="Description" required></textarea>

            <p>
                Please, upload images (max 3):
                <input type="file" id="files" name="dataimage" size="40"  accept=".jpg, .jpeg, .png"  onChange={e=> this.setImages(e.target.value)} multiple/>
            </p>

            <input type="submit" value="Add item" onClick={e=>this.AddItem(e)}/>
          </form>

    </div>
    </div>
    );
  }
}
