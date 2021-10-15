import React, { Component } from 'react';
//import './style/cart.css'

export class Cart extends Component {
  static displayName = Cart.name;

  render () {
    return (
      <div className="Cart">
      <div class="Cart-Container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
        </div>
        <div class="Cart-Items">
            <div class="image-box">
                <img src="https://m.media-amazon.com/images/I/61aUcKgWBRL._SL1050_.jpg" height="120px"/>
            </div>
            <div class="about">
                <h1 class="title">Earrings</h1>
                <h3 class="subtitle">NoName</h3>
            </div>
            <div class="counter">
                <div class="btn">
                    <label for="pass-quantity" class="pass-quantity">Quantity</label>
                    <input class="form-control" type="number" value="1" min="1"/>
                </div>
            </div>
            <div class="prices">
                <div class="amount">$2.99</div>
                <div class="remove">
                    <button id="remove-order">Remove</button>
                </div>
            </div>
        </div>
        <div class="checkout">
            <div class="total">
                <div>
                    <div class="Subtotal">Sub-Total</div>
                    <div class="items">2 items</div>
                </div>
                <div class="total-amount">$6.18</div>
            </div>
            <button class="button">Checkout</button>
        </div>
    </div>
    </div>
    );
  }
}
