import React from "react";
import jQuery from "jquery";

export default class StaffAddComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
        this.email = React.createRef();
        this.password = React.createRef();
        this.confirmPassword = React.createRef();

        this.addSeller = this.addSeller.bind(this);
    }

    addSeller() {
        this.setState({ errors: [] });
        jQuery.post({
            url: "/Staff/AddSeller",
            data: {
                Email: this.email.current.value.trim(),
                Password: this.password.current.value.trim(),
                ConfirmPassword: this.confirmPassword.current.value.trim()
            },
            context: this
        }).done(function(data) {
            if(data.ok) {
                this.email.current.value = "";
                this.password.current.value = "";
                this.confirmPassword.current.value = "";
                this.props.updateListSellers();
            } else {
                this.setState({ errors: data.errors });
            }
        });
    }

    render() {
        return (
            <div className="alert alert-info">
                <h5>Добавить нового сотрудника</h5>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Почта" ref={this.email}></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Пароль" ref={this.password}></input>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Подтвердите пароль" ref={this.confirmPassword}></input>
                </div>

                <div className="row">
                    <div className="col-6">
                        {this.state.errors.length > 0 &&
                            <ul className="text-danger">
                                {this.state.errors.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        }
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success float-right" onClick={this.addSeller}>Сохранить</button>
                    </div>
                </div>
            </div>
        );
    }
}