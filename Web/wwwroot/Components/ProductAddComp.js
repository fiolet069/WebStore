import React from "react";
import jQuery from "jquery";

class ProductAddComp extends React.Component {
    constructor(props) {
        super(props);

        this.name = React.createRef();
        this.cost = React.createRef();
        this.amount = React.createRef();
        this.nameChar = React.createRef();
        this.valueChar = React.createRef();
        this.state = { chars: [], errors: [] };

        this.addChar = this.addChar.bind(this);
        this.removeChar = this.removeChar.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    addChar() {
        let errors = [];
        let isError = false;
        this.setState({ errors: errors });

        if(!this.nameChar.current.value.trim()) {
            errors.push("Введите название характеристики");
            isError = true;
        }
        if(!this.valueChar.current.value.trim()) {
            errors.push("Введите значение характеристики");
            isError = true;
        }
        if(this.state.chars.some((item) => item.name === this.nameChar.current.value.trim()))
        {
            errors.push("Данная характеристика уже добавлена");
            isError = true;
        }
        
        if(isError)
            this.setState({ errors: errors });
        else 
        {
            let chars = this.state.chars;
            chars.push({ "name": this.nameChar.current.value, "value": this.valueChar.current.value });
            this.setState({ chars: chars });

            this.nameChar.current.value = "";
            this.valueChar.current.value = "";
        }
    }

    removeChar(name) {
        let chars = this.state.chars;
        let index = chars.findIndex(function(item, index, array) {
            if(item.name === name)
                return true;
        });
        chars.splice(index, 1);
        this.setState({ chars: chars });
    }

    addProduct() {
        this.setState({ errors: []});
        jQuery.post({
            url: "/Product/AddProduct",
            data: {
                Name: this.name.current.value.trim(),
                Cost: this.cost.current.value,
                Amount: this.amount.current.value,
                Chars: this.state.chars
            },
            context: this
        }).done(function (data) {
            if(data.ok) {
                this.name.current.value = "";
                this.cost.current.value = "";
                this.amount.current.value = "";
                this.setState({ chars: [] });

                this.props.updateListProduct();
            } else {
                this.setState({ errors: data.errors });
            }
        });
    }

    render() {
        return (
            <div>
                <a className="btn btn-outline-primary mb-3" data-toggle="collapse" href="#collapseAddProduct" aria-expanded="false" aria-controls="collapseAddProduct">Добавить новый товар</a>
                <div className="collapse mb-3" id="collapseAddProduct">
                    <div className="card card-body">

                        <div className="row">
                            <div className="form-group col-4">
                                <input type="text" placeholder="Название товара" className="form-control" ref={this.name} />
                            </div>
                            <div className="form-group col-4">
                                <input type="number" step="0.01" placeholder="Стоимость товара" className="form-control" ref={this.cost} />
                            </div>
                            <div className="form-group col-4">
                                <input type="number" placeholder="Количество товара" className="form-control" ref={this.amount} />
                            </div>
                        </div>
                        <hr />

                        <p className="h5">Список характеристик</p>
                        {this.state.chars.length > 0 &&
                            this.state.chars.map((item, index) =>
                                <div className="row font-weight-bold text-info" key={index}>
                                    <div className="col-4">{item.name}</div>
                                    <div className="col-4">{item.value}</div>
                                    <div className="col-4">
                                        <button className="btn btn-link text-danger font-weight-bold btn-block" onClick={this.removeChar.bind(this, item.name)}>Удалить</button>
                                    </div>
                                </div>
                            )
                        }
                        <div className="row">
                            <div className="form-group col-4">
                                <input type="text" placeholder="Название характеристики" className="form-control" ref={this.nameChar} />
                            </div>
                            <div className="form-group col-4">
                                <input type="text" placeholder="Значение характеристики" className="form-control" ref={this.valueChar} />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-link text-success font-weight-bold btn-block" onClick={this.addChar}>Добавить</button>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-6">
                                {this.state.errors.length > 0 &&
                                    <ul className="text-danger">
                                        {this.state.errors.map((item, index) => <li key={index}>{item}</li>)}
                                    </ul>
                                }
                            </div>
                            <div className="col-6">
                                <button className="btn btn-success float-right" onClick={this.addProduct}>Сохранить</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ProductAddComp;