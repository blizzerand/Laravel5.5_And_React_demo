import React, { Component } from "react";
import ReactDom from "react-dom";
import Product from "./Product";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      currentProduct: null,
      editButtonClicked: false
    };

    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirmation = this.handleDeleteConfirmation.bind(this);
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
    this.state.editButtonClicked = false;
    this.setState({ currentProduct: product });
  }

  handleAddProduct(product) {
    product.price = Number(product.price);

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
      var newProducts = this.state.products.filter(function(item) {
        return item !== currentProduct;
      });

      this.setState({ products: newProducts, currentProduct: null });
    });
  }

  handleDeleteConfirmation(event) {
    if (confirm("Are you sure you want to delete it?")) {
      this.handleDelete();
    }
  }

  handleEdit() {
    this.setState({ editButtonClicked: true });
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
          <h3>All Products ({this.state.products.length})</h3>
          <ul>{this.renderProducts()}</ul>
        </div>
        <div className="col-md-6">
          {this.state.editButtonClicked === true ? (
            <EditProduct
              product={this.state.currentProduct}
              update={this.handleUpdate}
            />
          ) : (
            <React.Fragment>
              <Product
                handleDeleteConfirmation={this.handleDeleteConfirmation}
                product={this.state.currentProduct}
                deleteProduct={this.handleDelete}
                handleEdit={this.handleEdit}
              />
              <AddProduct onAdd={this.handleAddProduct} />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

if (document.getElementById("root")) {
  ReactDom.render(<Main />, document.getElementById("root"));
}
