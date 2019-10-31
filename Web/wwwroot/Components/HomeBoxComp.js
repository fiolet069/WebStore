import React from "react";
import Cookie from "js-cookie";
import jQuery from "jquery";

class HomeBoxComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: "" };

        this.removeProductFromBox = this.removeProductFromBox.bind(this);
        this.executePurchase = this.executePurchase.bind(this);
    }

    removeProductFromBox(id) {
        let box = Cookie.getJSON("Box");
        let index = box.findIndex(function(item) {
            if(item.id === id)
                return true;
        });
        
        if(box[index].amount <= 1)
            box.splice(index, 1);
        else
            box[index].amount--;
        Cookie.set("Box", box);
        this.props.updateBox();
    }

    executePurchase() {
        jQuery.post({
            url: "/Home/ExecutePurchase",
            data: { boxItems: Cookie.getJSON("Box") },
            context: this
        }).done(function(data) {
            if(data.ok) {
                jQuery("#buyModal").modal("hide");
                Cookie.set("Box", []);
                this.props.updateListProduct();
                this.props.updateCustomer();
            } else {
                this.setState({ error: data.error });
            }
        });
    }

    render() {
        return(
            <div className="card">
                <div className="card-header h6">Корзина</div>
                <div className="card-body">

                    <table className="w-100 font-weight-bold text-info">
                        <tbody>
                            {this.props.box.map(item =>
                                <tr key={item.id}>
                                    <td className="w-50">{item.name}</td>
                                    <td>
                                        <button className="btn btn-link text-danger font-weight-bold" onClick={this.removeProductFromBox.bind(this, item.id)}>Уд.</button>
                                        {item.amount}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
                {this.props.box.length > 0 && 
                    <div className="card-footer">
                        <p className="text-info font-weight-bold">Сумма: {this.props.costBox}</p>
                        <p className="text-info font-weight-bold">Баланс: {this.props.customer.balance}</p>
                        <button className="btn btn-link text-primary font-weight-bold" data-toggle="modal" data-target="#buyModal">Оформить заказ</button>
                        
                        <div className="modal fade" id="buyModal" tabIndex="-1" aria-labelledby="buyModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                    <div className="modal-header h6">Подтверждение заказа</div>
                                    <div className="modal-body font-weight-bold">
                                        <p className="text-warning">Стоимость покупки: {this.props.costBox}</p>
                                        <p className="text-warning">Ваш баланс: {this.props.customer.balance}</p>

                                        {this.state.error.length > 0 &&
                                            <div className="alert alert-danger">{this.state.error}</div>
                                        }

                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                        <button className="btn btn-success" onClick={this.executePurchase}>Подтвердить</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default HomeBoxComp;