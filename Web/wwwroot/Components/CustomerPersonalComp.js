import React from "react";
import jQuery from "jquery";

export default class CustomerPersonalComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { customer: [], errorBalance: "" };
        this.sumBalance = React.createRef();

        this.getCustomerData = this.getCustomerData.bind(this);
        this.addBalance = this.addBalance.bind(this);
        this.getCustomerData();
    }

    getCustomerData() {
        jQuery.post({
            url: "/Customer/GetCustomerData",
            context: this
        }).done(function(data) {
            this.setState({ customer: data });
        });
    }

    addBalance() {
        this.setState({ errorBalance: "" });
        jQuery.post({
            url: "/Customer/AddBalance",
            data: { sum: this.sumBalance.current.value },
            context: this
        }).done(function(data) {
            if(data.ok) {
                jQuery("#addBalanceModal").modal("hide");
                this.getCustomerData();
            } else {
                this.setState({ errorBalance: data.error });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="alert alert-info">
                    <p className="font-weight-bold h5">Ваш баланс: <span className="text-success">{this.state.customer.balance}</span></p>
                    <hr></hr>

                    <p className="font-weight-bold">Пополнение баланса</p>
                    <div className="form-group">
                        <label>Сумма</label>
                        <input type="number" className="form-control" ref={this.sumBalance}></input>
                    </div>
                    <div className="form-group">
                        <label>Номер карты</label>
                        <input type="text" className="form-control" value="XXXX-XXXX-XXXX-XXXX" readOnly></input>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Имя держателя карты</label>
                            <input type="text" className="form-control" value="TEST ACCOUNT" readOnly></input>
                        </div>
                        <div className="form-group col-6">
                            <label>CVV</label>
                            <input type="text" className="form-control" value="XXX" readOnly></input>
                        </div>
                    </div>

                    <div className="text-right">
                        <button className="btn btn-success" data-toggle="modal" data-target="#addBalanceModal">Пополнить баланс</button>
                    </div>
                    <div className="modal fade" id="addBalanceModal" tabIndex="-1" aria-labelledby="addBalanceModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header h6">Подтверждение</div>
                                <div className="modal-body font-weight-bold">
                                    <p className="text-warning">C карты "XXXX-XXXX-XXXX-XXXX" будут списаны средства.</p>
                                    {this.state.errorBalance.length > 0 &&
                                        <div className="alert alert-danger">{this.state.errorBalance}</div>
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                                    <button className="btn btn-success" onClick={this.addBalance}>Подтвердить</button>
                                </div>
                         </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}