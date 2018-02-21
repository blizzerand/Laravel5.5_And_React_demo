import React, { Component } from "react";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProduct: {
        title: "",
        description: "",
        price: 0,
        availability: 0
      }
    };

    // Boilterplate code for binding meethods with `this`
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /** this mthod dynamically accepts inputs and stores it in the state **/
  handleInput(key, e) {
    /**Duplicating and updating the state */
    var state = Object.assign({}, this.state.newProduct);
    state[key] = e.target.value;
    this.setState({ newProduct: state });
  }

  /**This methods is invoked when submit button is pressed */
  handleSubmit(e) {
    e.preventDefault();

    /**
     * A callback to the onAdd props. The current state is passed as a param
     */
    this.props.onAdd(this.state.newProduct);
  }
  render() {
    const divStyle = {};
    return (
      <div>
        <h2>Add new product</h2>

        <div style={divStyle}>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={e => this.handleInput("title", e)}
            />
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              onChange={e => this.handleInput("description", e)}
            />
            <label htmlFor="price">price</label>
            <input
              name="price"
              type="text"
              onChange={e => this.handleInput("price", e)}
            />

            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    );
  }
}
