import React from "react";
import jQuery from "jquery";

export default class StaffListComp extends React.Component {
    constructor(props) {
        super(props);
        this.deleteSeller = this.deleteSeller.bind(this);
    }

    deleteSeller(id) {
        jQuery.post({
            url: "/Staff/DeleteSeller",
            data: { id: id },
            context: this
        }).done(function() {
            this.props.updateListSellers();
        });
    }

    render() {
        return(
            <table className="table table-bordered w-100 font-weight-bold">
                <thead>
                    <tr>
                        <td>Почта</td>
                        <td>Пароль</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody className="text-info">
                    {this.props.sellers.map((item, index) =>
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>
                                <button className="btn btn-link text-danger font-weight-bold p-0" onClick={this.deleteSeller.bind(this, item.id)}>Удалить</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}