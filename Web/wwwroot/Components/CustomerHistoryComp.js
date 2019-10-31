import React from "react";
import jQuery from "jquery";

export default class CustomerHistoryComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { history: [] };

        this.getHistory = this.getHistory.bind(this);
        this.getHistory();
    }

    getHistory() {
        jQuery.post({
            url: "/Customer/GetHistory",
            context: this
        }).done(function(data) {
            this.setState({ history: data });
        });
    }

    formDateAndTimeString(data) {
        let dateAndTime = new Date(data);
        let options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" };
        return new Intl.DateTimeFormat("ru", options).format(dateAndTime);
    }

    formCommonCost(listProducts) {
        let commonCost = 0;
        listProducts.map(item => {
            commonCost += item.cost * item.amount;
        });
        return commonCost;
    }

    render() {
        return (
            <div>
                <ul className="list-group">
                    {this.state.history.map((item, index) =>
                        <li key={index} className="list-group-item">

                            <p className="font-weight-bold">Дата и время: <span className="text-success">{this.formDateAndTimeString(item.dateAndTime)}</span></p>
                            <p className="font-weight-bold">Общая стоимость: <span className="text-success">{this.formCommonCost(item.listProducts)}</span></p>
                            <table className="w-100 table table-borderless text-info font-weight-bold">
                                <tbody>
                                    <tr className="text-dark">
                                        <td>Название товара</td>
                                        <td>Стоимость</td>
                                        <td>Количество</td>
                                    </tr>
                                    {item.listProducts.map((prod, prodIndex) =>
                                        <tr key={index + "_" + prodIndex}>
                                            <td>{prod.name}</td>
                                            <td>{prod.cost}</td>
                                            <td>{prod.amount}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </li>
                    )}
                </ul>
            </div>
        );
    }
}