import React, { Component } from "react";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ product: this.props.product });
  }

  handleInput(key, e) {
    let state = Object.assign({}, this.state.product);
    state[key] = e.target.value;
    this.setState({ product: state });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update(this.state.product);
    this.editForm.reset();
  }

  render() {
    const divStyle = {};
    const product = this.state.product;

    return (
      <div>
        <h2>Edit product</h2>

        <div style={divStyle}>
          <form
            onSubmit={this.handleSubmit}
            ref={input => (this.editForm = input)}
          >
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              value={product.title}
              onChange={e => this.handleInput("title", e)}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              type="text"
              value={product.description}
              onChange={e => this.handleInput("description", e)}
            />
            <label htmlFor="price">price</label>
            <input
              name="price"
              type="text"
              value={product.price}
              onChange={e => this.handleInput("price", e)}
            />

            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProduct;
