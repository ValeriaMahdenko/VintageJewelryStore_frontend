import axios from "axios";
import React, { Component } from "react";
import "./style/home.css";
import $, { data } from 'jquery'; // <-to import jquery
import 'bootstrap';
import swal from "sweetalert";


export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      OrderProducts: [],
      Products: [],
      Loading: false,
      Page: 1,
      PrevY: 0,
      Next: "",
    };
  }

  componentDidMount() {
    console.log(localStorage['IsAdmin'])
    if(localStorage['IsLogin'] && localStorage['IdOrder']){
      console.log("yes")
      axios.get(`http://127.0.0.1:8000/orders/${localStorage["IdOrder"]}/`, { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`} }
      ).then(response => {
          this.setState({
            OrderProducts: response.data.selected_products,
          })

      });
    }

    this.getProducts(this.state.Page);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);

  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.PrevY > y) {
      if (this.state.Next != null) {
        var curPage = this.state.Page + 1;
        this.getProducts(curPage);
        this.setState({ Page: curPage });
      } else {
      }
    }
    this.setState({ PrevY: y });
  }

  addEventListeners()  {
    $('#productInfoModal').on('show.bs.modal', event => {
      const button = $(event.relatedTarget); // Button that triggered the modal
      const id  = String(button.data('id')); // Extract info from data-* attributes
      var product = this.state.Products.find(i =>i["id"]==id);
      const modal = $('#productInfoModal');
      modal.find('.modal-body .card-name').text(product["name"]);
      modal.find('.modal-body .card-brand').text(`Brandname: ${product["brand_name"]}`);
      modal.find('.modal-body .card-material').text(`Material: ${product["material"]}`);
      modal.find('.modal-body .card-description').text(`Description:  ${product["description"]}`);
      modal.find('.modal-body .card-amount').text(`Amount: ${product["amount"]}`);
      modal.find('button.buy')
          .text(`${product["price"]} - Buy`)
          .data('id', id);
    })};

  

  getProducts(page) {
    this.setState({ Loading: true });
    axios
      .get(
        `http://127.0.0.1:8000/products/?page=${page}&ordering=${
          document.getElementById("selectid").value
        }&search=${document.getElementById("searchfield").value}`
      )
      .then((response) => {
        if (page == 1) {
          this.setState({
            Products: response.data.results,
            Next: response.data.next,
            Page: page,
            
          });
        } else {
          this.setState({
            Products: this.state.Products.concat(response.data.results),
            Next: response.data.next,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
      
      this.addEventListeners();

  }

  AddToCart(e)
  {
    e.preventDefault();
    console.log(localStorage['IsLogin'])
    if(localStorage['IsLogin']){
      console.log("yes")
      var dataID = parseInt(e.target.getAttribute("data-id"));     
      if(localStorage['IdOrder']){
        console.log(localStorage['IdOrder'])
        var d = this.state.OrderProducts
        d.push({"product": dataID,
                "amount_selected": 1})
        console.log(d)

        axios.put(`http://127.0.0.1:8000/orders/${localStorage['IdOrder']}/`, 
        {
          "status": "Opened",
          "selected_products": d,
        },
        { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`}})
        .then(function(response) {
          swal({
            title: "Success",
            text: "You have addeed a new item to your cart! We can watch this in cart.",
            icon: "success",
            button: "OK"
          });})
        .catch(function(response) {
          console.log(response);
          swal({
            title: "Error",
            text: "Error",
            icon: "error",
            button: "Try again"
          });
        });
      }
      else{

        axios.post("http://127.0.0.1:8000/orders/", 
        {
          "status": "Opened",
          "selected_products": [{
            "product": dataID,
            "amount_selected": 1
          }],
        },
        { headers: {"Authorization" : `Bearer ${localStorage["Token"]}`,}})
        .then(function(response) {
          swal({
            title: "Success",
            text: "You have addeed a new item to your cart! We can watch this in cart.",
            icon: "success",
            button: "OK"
          });

          console.log(response)
          localStorage.setItem("IdOrder", response.data.id)
        }).catch(function(response) {
          swal({
            title: "Error",
            text: `${response}`,
            icon: "error",
            button: "Try again"
          });
        });
      }
    }
    else{
      console.log("no")
      swal({
        title: "Try again",
        text: "You must log in first!",
        icon: "info",
        button: "Try again"
      });
    }
  }


  render() {
    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px",
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.Loading ? "block" : "none" };

    return (
      
      <div className="HomePage">
        <div class="post-container">
          Sort:
          <select id="selectid" name="selectsort" onChange={() => this.getProducts(1)}>
            <option value="price" id="asc" selected>Ascending by price{" "}</option>
            <option value="-price" id="desc">Desceding by price</option>
          </select>
          Search:
          <input id="searchfield" defaultValue="" onChange={() => this.getProducts(1)}/>
        </div>
        <div className="main-container">
          {this.state.Products.map((element) => (
            <div class="col">
              <div class="card-product">
                <div class="card-body">
                  {element.images.map((el) => (
                    <img class="card-img-top" src={el.image} />
                  ))}
                  <h4 class="card-title">{element.name}</h4>
                  <p class="card-text">{element.description}</p>
                  <button class="btn btn-primary info" data-toggle="modal" data-target="#productInfoModal" data-id={element.id} 
                  >Info</button>
                  <button class="btn btn-primary buy" data-id={element.id} onClick={e=> this.AddToCart(e)}>
                    {element.price} - Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div
            ref={(loadingRef) => (this.loadingRef = loadingRef)}
            style={loadingCSS}>
            <span style={loadingTextCSS}>Loading...</span>
          </div>
        </div>
        <div class="modal fade" id="productInfoModal" tabindex="-1" role="dialog" aria-labelledby="productInfoLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="productInfoLabel"> Product Info </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h4 class="card-name"></h4>
                <h6 class="card-brand">Brandname: </h6>
                <h6 class="card-material" >Material: </h6>
                <p class="card-description">Description: </p>
                <p class="card-amount">Amount: </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
