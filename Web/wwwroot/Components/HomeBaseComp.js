import React from "react";
import jQuery from "jquery";
import Cookie from "js-cookie";
import HomeListComp from "./HomeListComp";
import HomeBoxComp from "./HomeBoxComp";

class HomeBaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listProduct: [], box: [], costBox: undefined, customer: { isAuth: false, balance: 0} };

        this.updateListProduct = this.updateListProduct.bind(this);
        this.updateBox = this.updateBox.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.updateListProduct();
    }

    updateListProduct() {
        jQuery.post({
            url: "/Home/GetListProducts",
            context: this
        }).done(function(data) {
            this.setState({ listProduct: data });
            this.updateCustomer();
            this.updateBox();
        });
    }

    updateBox() {
        let box = Cookie.getJSON("Box");
        let costBox = 0;

        if(!box) {
            box = [];
        } else {
            box.map(boxItem => {
                var product = this.state.listProduct.find(item => {
                    if(item.id === boxItem.id)
                        return true;
                });
                costBox += boxItem.amount * product.cost;
            });
        }
        this.setState({ box: box, costBox: costBox })
    }

    updateCustomer() {
        jQuery.post({
            url: "/Home/GetCustomerInfo",
            context: this
        }).done(function(data) {
            this.setState({ customer: { isAuth: data.isAuth, balance: data.balance } })
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-8">
                    <HomeListComp listProduct={this.state.listProduct} updateBox={this.updateBox} customer={this.state.customer} />
                </div>
                {this.state.customer.isAuth &&
                    <div className="col-4">
                        <HomeBoxComp box={this.state.box} costBox={this.state.costBox} customer={this.state.customer} 
                            updateBox={this.updateBox} updateListProduct={this.updateListProduct} updateCustomer={this.updateCustomer} />
                    </div>
                }
                {!this.state.customer.isAuth &&
                    <div className="col-4 alert alert-danger font-weight-bold">
                        <span>Только авторизованые пользователи c ролью "Customer" имеют доступ к покупке товаров</span>
                    </div>
                }
            </div>
        );
    }
}

export default HomeBaseComp;