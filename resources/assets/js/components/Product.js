import React, { component } from "react";

/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const Product = ({ product }) => {
  const divStyle = {};

  if (!product) {
    return <div style={divStyle}> No Product was selected. </div>;
  }

  //Else, display the product data
  return (
    <div style={divStyle}>
      <h2> {product.title} </h2>
      <p> {product.description} </p>
      <h3> Status {product.availability ? "Available" : "Out of stock"} </h3>
      <h3> Price : {product.price} </h3>
      <input type="button" value="edit" onClick={this.handleEdit} />
      <input type="button" value="delete" onClick={this.handleDelete} />
    </div>
  );
};

export default Product;
