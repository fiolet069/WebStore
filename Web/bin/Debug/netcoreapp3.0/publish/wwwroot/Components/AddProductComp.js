import React from "react";

class AddProductComp extends React.Component {
    constructor(props) {
        super(props);

        this.name = React.createRef();
        this.cost = React.createRef();
        this.amount = React.createRef();
        this.chars = []; // Properties
        this.nameChar = React.createRef();
        this.valueChar = React.createRef();
    }

    render() {
        return (
            <div>
                <a className="btn btn-primary my-3" data-toggle="collapse" href="#collapseAddProduct" aria-expanded="false" aria-controls="collapseAddProduct">Добавить новый товар</a>
                <div className="collapse mb-3" id="collapseAddProduct">
                    <div className="card card-body">

                        <div className="row">
                            <div className="form-group col-4">
                                <input type="text" placeholder="Название товара" className="form-control" ref={this.name} />
                            </div>
                            <div className="form-group col-4">
                                <input type="number" placeholder="Стоимость товара" className="form-control" ref={this.cost} />
                            </div>
                            <div className="form-group col-4">
                                <input type="number" placeholder="Количество товара" className="form-control" ref={this.amount} />
                            </div>
                        </div>
                        <hr />

                        <p className="h5">Список характеристик</p>
                        <div className="row">
                            <div className="form-group col-4">
                                <input type="text" placeholder="Название характеристики" className="form-control" ref={this.nameChar} />
                            </div>
                            <div className="form-group col-4">
                                <input type="text" placeholder="Значение характеристики" className="form-control" ref={this.valueChar} />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-success font-weight-bold px-4">+</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddProductComp;