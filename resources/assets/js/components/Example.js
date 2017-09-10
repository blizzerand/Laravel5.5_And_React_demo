import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                this.setState({ products });
            });
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
                <tr>
                    <td>{ product.id }</td>
                    <td>{ product.title }</td>
                    <td>{ product.description }</td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div>
                <h2>Hey, { window.name }</h2>

                <p>Here are the people using your application...</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.renderProducts() }
                    </tbody>
                </table>
            </div>
        );
    }
}


export default Example;

// We only want to try to render our component on pages that have a div with an ID
// of "example"; otherwise, we will see an error in our console 
if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}