import axios from 'axios';
import React, { Component } from 'react';
//import './style/cart.css'
import $ from 'jquery'; // <-to import jquery
import { isJSDocThisTag } from 'typescript';
import swal from "sweetalert";

export class ShoppingList extends Component {
  static displayName = ShoppingList.name;

  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      Price: 0,
      Info: []     
    };
  }
  componentDidMount()
  {
    axios.get("http://127.0.0.1:8000/orders/",
    {headers: {"Authorization" : `Bearer ${localStorage["Token"]}`}})
    .then(response => {
      response.data.results.forEach(element => {
        if(element.status === "Completed")
        {
          this.setState({
            Products: element.selected_products,
            Price: element.total_price
          })                 
        }
        this.DetailProduct()
      });
    
    });
  }

  DetailProduct()
  { 
    var dc =[]
    console.log(this.state.Products)
    this.state.Products.forEach((element) => {
      axios.get(`http://127.0.0.1:8000/products/${element.product}/`).then(response => {
          dc.push({
            "Name": response.data.name,
            "Image": response.data.images[0].image,
            "Price": response.data.price
          })
        })
    })

    var d = {
      "Price": this.state.Price,
      "Products": dc,
    }
    this.state.Info.push(d)
  }


  render () {
    {console.log(this.state.Info)}

    return (
      <div className="ShopList">
      <div class="Container">

        <div class="Header">
            <h3 class="Heading">Shopping List</h3>
        </div>
        <div class="List-Items" id="List-Items">
          {}
        </div>

    </div>
    </div>
    );
  }
}
