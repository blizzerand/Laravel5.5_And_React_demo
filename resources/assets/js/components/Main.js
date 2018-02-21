import React, { Component } from "react";
import ReactDom from "react-dom";
import Product from "./Product";
import AddProduct from "./AddProduct";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      currentProduct: null
    };

    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  componentDidMount() {
    /* fetch API in action */
    fetch("/api/products")
      .then(response => {
        return response.json();
      })
      .then(products => {
        //Fetched product is stored in the state
        this.setState({ products });
      });
  }

  renderProducts() {
    return this.state.products.map(product => {
      return (
        /* When using list you need to specify a key
        * attribute that is unique for each list item
        */
        <li key={product.id} onClick={() => this.handleClick(product)}>
          {product.title}
        </li>
      );
    });
  }

  handleClick(product) {
    this.setState({ currentProduct: product });
  }

  handleAddProduct(product) {
    product.price = Number(product.price);
    console.log(product);
    fetch("api/products", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState(prevState => ({
          products: prevState.products.concat(data),
          currentProduct: data
        }));
      });
  }

  handleDelete() {
    const currentProduct = this.state.currentProduct;
    fetch("api/products/" + this.state.currentProduct.id, {
      method: "delete"
    }).then(response => {
      /* Duplicate the array and filter out the item to be deleted */
      var newProducts = this.statee.products.filter(function(item) {
        return item !== currentProduct;
      });
      this.setState({ products: newProducts, currentProduct: null });
    });
  }

  handleUpdate(product) {
    const currentProduct = this.state.currentProduct;
    fetch("api/products/" + currentProduct.id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        /** updating the state */
        var newProducts = this.state.products.filter(function(item) {
          return item !== currentProduct;
        });
        this.setState(prevState => ({
          products: newProducts.concat(product),
          currentProduct: product
        }));
      });
  }

  render() {
    return (
      <div>
        <div className="col-md-6">
          <h3>All Products</h3>
          <ul>{this.renderProducts()}</ul>
        </div>
        <div className="col-md-6">
          <Product
            product={this.state.currentProduct}
            delete={this.handleDelete}
            update={this.handleUpdate}
          />
          <AddProduct onAdd={this.handleAddProduct} />
        </div>
      </div>
    );
  }
}

export default Main;

if (document.getElementById("root")) {
  ReactDom.render(<Main />, document.getElementById("root"));
}
