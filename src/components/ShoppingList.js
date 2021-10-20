import axios from 'axios';
import React, { Component } from 'react';
import './style/shoplist.css'
import $ from 'jquery'; // <-to import jquery
import { isJSDocThisTag } from 'typescript';
import swal from "sweetalert";

export class ShoppingList extends Component {
  static displayName = ShoppingList.name;

  constructor(props) {
    super(props);
    this.state = {
      IdOrder: 0,
      Price: 0,
      Orders : []     
    };
  }
  componentDidMount()
  {
    axios.get("http://127.0.0.1:8000/orders/?ordering=-id",
    {headers: {"Authorization" : `Bearer ${localStorage["Token"]}`}})
    .then(response => {
      var result = "";
      response.data.results.forEach(element => {
        if(element.status === "Completed")
        {
          this.setState({
            IdOrder: element.id,
            Price: element.total_price
          })                 
        
        this.state.Orders.push({
          'Id': this.state.IdOrder,
          'Price': this.state.Price,
        })
        result = "";
        this.state.Orders.map((el) =>(
          result += `
          <div class="product-grid2">
              <div class="product-image"> <img src="https://cdn1.iconfinder.com/data/icons/e-commerce-and-shopping-10/64/e-commerce_shopping_order_completed-512.png"/> 
              </div>
              <div class="product-content">
                  <h3 class="title">
                  <a href="#">Order №${el.Id}</a>
                  </h3> 
                  <span class="price">${el.Price} $</span>
              </div>
          </div>`
        ))
        }
      });
      if(this.state.Orders.length == 0) result += "<h2>You have no confirmed orders</h2>"
      document.getElementById("List-Items").innerHTML = result;
    });
  }
  
  render () {
    {console.log(this.state.Orders)}
    return (
      <div className="ShopList">
      <div class="Container">

        <div class="Header">
            <h3 class="Heading">Shopping List</h3>
        </div>
        <div class="List-Items" id="List-Items">
              
            </div>           
          </div>
        </div>
    );
  }
}
