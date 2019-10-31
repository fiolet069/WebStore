import React from "react";
import jQuery from "jquery";
import ProductAddComp from "./ProductAddComp";
import ProductListComp from "./ProductListComp";

class ProductBaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listProduct: [] };

        this.updateListProduct = this.updateListProduct.bind(this);
        this.updateListProduct();
    }

    updateListProduct() {
        jQuery.post({
            url: "/Product/GetListProducts",
            context: this
        }).done(function(data) {
            this.setState({ listProduct: data });
        });
    }

    render() {
        return (
            <div>
                <ProductAddComp updateListProduct={this.updateListProduct} />                
                <ProductListComp listProduct={this.state.listProduct} updateListProduct={this.updateListProduct} />
            </div>
        );
    }
}

export default ProductBaseComp;