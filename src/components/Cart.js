import axios from 'axios';
import React, { Component } from 'react';
import './style/cart.css'

export class Cart extends Component {
  static displayName = Cart.name;

  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      Price: 0,
      Product_name: "",
      Product_image: "",
      Product_price: ""
    };
  }

  componentDidMount()
  {
      console.log(this.state.Products)
      axios.get(`http://127.0.0.1:8000/orders/${localStorage["IdOrder"]}/`, { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {
          this.setState({
              Products: response.data.selected_products,
              Price: response.data.total_price
          })
      });

    this.forceUpdate();
    this.WatchProducts();
    console.log(localStorage["IdOrder"])
  }
 
  /*componentDidUpdate(prevProps)
  {
      if(this.props.Products !== prevProps.Products)
      {
          this.WatchProducts();
      }
      else{
      }
  }*/

  WatchProducts()
  {
    axios.get(`http://127.0.0.1:8000/orders/${localStorage["IdOrder"]}/`, { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {
          this.setState({
              Products: response.data.selected_products,
              Price: response.data.total_price
          })
      });
      
    console.log("in")
    document.getElementById("Cart-Items").innerHTML="";
    this.state.Products.forEach((element) => {
        console.log(element);
        axios.get(`http://127.0.0.1:8000/products/${element.product}/`).then(response => {
            console.log(response);
            this.setState({
                Product_name: response.data.name,
                Product_image: response.data.images[0].image,
                Product_price: response.data.price
        })

        var amount = document.createElement("div")
        amount.setAttribute("class", "amount")
        amount.innerText = this.state.Product_price

        var button = document.createElement("button")
        button.innerText = "Remove"

        var prices = document.createElement("div")
        prices.setAttribute("class", "prices")
        prices.append(amount, button)

        var h = document.createElement("h1")
        h.setAttribute("class", "title")
        h.innerText = this.state.Product_name

        var img = document.createElement("img")
        img.setAttribute("src", this.state.Product_image)
        img.setAttribute("height", "120px")

        document.getElementById('Cart-Items').append(img, h, prices)
    })
    
  })
}


  render () {
    return (
      <div className="Cart">
      <div class="Cart-Container">

        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
        </div>
        <div class="Cart-Items" id="Cart-Items"></div>

        <div class="checkout">
            <div class="total">
                <div>
                    <div class="Subtotal">Sub-Total</div>
                    <div class="items">2 items</div>
                </div>
                <div class="total-amount">{this.state.Price}</div>
            </div>
            <button class="button">Checkout</button>
        </div>

    </div>
    </div>
    );
  }
}
