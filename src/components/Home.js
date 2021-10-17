import axios from "axios";
import { timers } from "jquery";
import React, { Component } from "react";
import "./style/home.css";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      Loading: false,
      Page: 1,
      PrevY: 0,
      Next: "",
    };
  }

  componentDidMount() {
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
    if((this.state.PrevY > y))
    {
      if(this.state.Next != null){
        var curPage = this.state.Page + 1;
        this.getProducts(curPage);
        this.setState({ Page: curPage });
      }
      else{
        console.log("stop");
      }
    }
    this.setState({ PrevY: y });
  }


  getProducts(page) {
    this.setState({ Loading: true });
    axios
      .get(`http://127.0.0.1:8000/products/?page=${page}&ordering=${document.getElementById('selectid').value}&search=${document.getElementById("searchfield").value}`)
      .then((response) => {
        if(page==1)
        {
          this.setState({
            Products: response.data.results,
            Next: response.data.next,
            Page: page
          })
        }
        else{
          this.setState({
          
            Products: this.state.Products.concat(response.data.results),
            Next: response.data.next,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
          <select id="selectid" name="selectsort" onChange={() =>this.getProducts(1)}>
            <option value="price" id="asc" selected> Ascending by price </option>
            <option value="-price" id="desc"> Desceding by price</option>
          </select>
          Search: 
          <input id="searchfield" defaultValue="" onChange={() => this.getProducts(1)}/>
        </div>
        <div className="main-container">
          {this.state.Products.map(
            (element) => (
              <div class="col">
                  <div class="card-product">
                    <div class="card-body">
                    {element.images.map(el =>( <img class="card-img-top" src={el.image}/> ))}
                      <h4 class="card-title">{element.name}</h4>
                      <p class="card-text">{element.description}</p>
                      <button 
                      class="btn btn-primary info" data-toggle="modal"
                      data-target="#productInfoModal" data-id={element.id}>Info
                      </button>
                      <button
                        class="btn btn-primary buy"
                        data-id={element.id}>
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
      </div>
    );
  }
}
