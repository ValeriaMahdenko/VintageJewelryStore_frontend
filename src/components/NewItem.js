import React, { Component } from 'react';
import './style/newitem.css'

export class NewItem extends Component {
  static displayName = NewItem.name;

  render () {
    return (
      <div className="NewItem">
      <h3>New item</h3>
      <div class="container">
            <label for="name">Name</label>
            <input type="text" id="name" name="Name" placeholder="Name"/>

            <label for="bname">Brandname</label>
            <input type="text" id="bname" name="brandname" placeholder="Brandname"/>

            <label for="material">Material</label>
            <input type="text" id="material" name="material" placeholder="Material"/>
            
            <label for="price">Price</label>
            <input type="text" id="price" name="price" placeholder="Price"/>

            <label for="amount">Amount</label>
            <input type="text" id="amount" name="amount" placeholder="Amount"/>

            <label for="description">Description</label>
            <textarea id="description" name="description" placeholder="Description" ></textarea>

            <p>
                Please, upload images (max 3):
                <input type="file" name="dataimage" size="40" accept=".jpg, .jpeg, .png" multiple/>
            </p>
            <input type="submit" value="Add item"/>

    </div>
    </div>
    );
  }
}
