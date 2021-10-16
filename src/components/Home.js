import axios from 'axios';
import React, { Component } from 'react';
import './style/home.css'

export class Home extends Component {
  static displayName = Home.name;


  constructor(props) {
    super(props);
    this.state = { Products: [], Search: "", Sort: "", Page: "1"};
  }

  
  setSearch(s ) {
    this.setState({ Search: s})
  }
  
  setSort(s ) {
    
    this.setState({ Sort: s})
  }
  
  setPage(p ) {
    this.setState({ Page: p})
  }

  componentDidMount()
  {
    this.GetProducts();
  }
  
  GetUserToken()
  {
    axios.get("http://127.0.0.1:8000/users/", { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {localStorage.setItem("Id", response.data.id); localStorage.setItem("IsAdmin", response.data.is_admin); localStorage.setItem("IsLogin", true)}
      )
  }

  GetProducts()
  {
    /*var url = 'http://127.0.0.1:8000/products/';

    if(document.getElementById('selectid').value === "price_asc") {
        url += "?ordering=price"
    }
    else if(document.getElementById('selectid').value === "price_desc") {
        url += "?ordering=-price"
    }
    if(document.getElementById("searchfield").value !== ''){
        url += "&search=" + document.getElementById("searchfield").value;
    }*/
    
    axios.get(`http://127.0.0.1:8000/products/?search=${this.state.Search}&page=${this.state.Page}&ordering=${this.state.Sort}`).then(response => this.setState({
      Products: response.data.results
    }));


    document.getElementById("products").innerHTML = "";

    this.state.Products.forEach(element => {
      console.log(element);
      
      var description = document.createElement("p")
      description.setAttribute("class", "card-text")
      description.innerText = element.description

      var title = document.createElement("h4")
      title.setAttribute("class", "card-title")
      title.innerText = element.name

      var image = document.createElement("img")
      image.setAttribute("class", "card-img-top")
      image.setAttribute("src", element.images[0].image)

      var button1 = document.createElement("button")
      button1.setAttribute("class", "btn btn-info")
      button1.innerText = "Info"

      var button2 = document.createElement("button")
      button2.setAttribute("class", "btn btn-primary buy")
      button2.innerText = element.price + " - Buy"

      var cardbody = document.createElement("div")
      cardbody.setAttribute("class", "card-body")
      cardbody.append(image, title, description, button1, button2)

      var cardproduct = document.createElement("div")
      cardproduct.setAttribute("class", "card-product")
      cardproduct.append(cardbody)

      var col = document.createElement("div")
      col.setAttribute("class", "col")
      col.append(cardproduct)

      document.getElementById('products').append(col)

    });
  }

  render () {
    return (
      <div>

      <div class="post-container">
		Sort:
		<select id="selectid" name="selectsort" onChange={e => {this.setSort(e.target.value); this.GetProducts()} } >
			<option value="price" id="asc" onchange= {e => this.setSort("price")}  selected> Ascending by price </option>

			<option value="-price" id="desc" onchange= {e => this.setSort("-price")}> Desceding by price</option>
		</select>
		Search:
		<input id="searchfield" value={this.state.Search} onChange={e=> {this.setSearch(e.target.value); this.GetProducts()}}/>
    </div>
    <div class="main-container" id="products" onLoad={e => {this.GetProducts(); this.GetProducts()}}>
    
    </div>
    

<div class="modal fade" id="productInfoModal" tabindex="-1" role="dialog" aria-labelledby="productInfoLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="productInfoLabel">Product Info</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img class="card-img-top" src="" alt=""/>
        <h4 class="card-name"></h4>
        <h6 class="card-brand">Brandname: </h6>
        <h6 class="card-material">Material: </h6>
        <p class="card-description">Description: </p>
        <p class="card-amount">Amount: </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button class="btn btn-primary buy" data-id="id">Buy</button>
      </div>
    </div>
  </div>
</div>
</div>

    );
  }
  }
