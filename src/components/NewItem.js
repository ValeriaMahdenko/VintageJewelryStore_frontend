import React, { Component } from 'react';
import './style/newitem.css'

export class NewItem extends Component {
  static displayName = NewItem.name;

  constructor(props) {
    super(props);
    this.state = { Name: "", BrandName: "", Material: "", Price: "", Amount: "", Description: "", Image: [] }

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

  AddItem(e)
  {
    e.preventDefault();
  }

  /*setImage(i ) {
    console.log(i);
    this.setState({ image: i})
  }*/
//value={this.state.Image} onChange={e=> this.setImage(e.target.value)}


  render () {
    return (
      <div className="NewItem">
      <h3>New item</h3>
      <div class="container">
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
                <input type="file" name="dataimage" size="40"  accept=".jpg, .jpeg, .png" multiple/>
            </p>

            <input type="submit" value="Add item"/>

    </div>
    </div>
    );
  }
}
