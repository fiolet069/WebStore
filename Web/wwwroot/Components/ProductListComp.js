import React from "react";
import jQuery from "jquery";

class ProductListComp extends React.Component {
    constructor(props) {
        super(props);

        this.deactivateProduct = this.deactivateProduct.bind(this);
        this.activateProduct = this.activateProduct.bind(this);
    }

    deactivateProduct(id) {
        jQuery.post({
            url: "/Product/DeactivateProduct",
            data: { id: id },
            context: this
        }).done(function(data) {
            this.props.updateListProduct();
        });
    }

    activateProduct(id) {
        jQuery.post({
            url: "/Product/ActivateProduct",
            data: { id: id },
            context: this
        }).done(function(data) {
            this.props.updateListProduct();
        });
    }

    render() {
        return (
            <div className="row">
                {this.props.listProduct.map(prod =>
                    <div className="col-3 mb-3" key={prod.id}>
                        <div className="card">
                            <h6 className="card-header">{prod.name}</h6>
                            <div className="card-body">

                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td>Стоимость</td>
                                            <td>{prod.cost}</td>
                                        </tr>
                                        <tr>
                                            <td>Количество</td>
                                            <td>{prod.amount}</td>
                                        </tr>
                                        {prod.chars.map(prop => 
                                            <tr key={prop.id}>
                                                <td>{prop.name}</td>
                                                <td>{prop.value}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                            <div className="card-footer">
                                {prod.isActive && 
                                    <button className="btn btn-danger float-right" onClick={this.deactivateProduct.bind(this, prod.id)}>Дезактивировать</button>
                                }
                                {!prod.isActive &&
                                    <button className="btn btn-success float-right" onClick={this.activateProduct.bind(this, prod.id)}>Активировать</button>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ProductListComp;