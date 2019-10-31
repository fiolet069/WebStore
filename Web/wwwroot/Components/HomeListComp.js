import React from "react";
import Cookie from "js-cookie";

class HomeListComp extends React.Component {
    constructor(props) {
        super(props);
        this.addProductAtBox = this.addProductAtBox.bind(this);
    }

    addProductAtBox(id, name) {
        let box = Cookie.getJSON("Box");
        if(box === undefined) {
            box = [];
            box.push({ id: id, name: name, amount: 1});
            Cookie.set("Box", box);
        } else {
            box = Cookie.getJSON("Box");
            let index = box.findIndex(function(item, index, array) {
                if(item.id === id)
                    return true;
            });
    
            if(index === -1)
                box.push({ id: id, name: name, amount: 1});
            else {
                var product = this.props.listProduct.find(function(item) {
                    if(item.id === box[index].id)
                        return true;   
                });
                if(box[index].amount < product.amount)
                    box[index].amount++;
            }
            Cookie.set("Box", box);
        }
        this.props.updateBox();
    }

    render() {
        return (
            <div className="row">
                {this.props.listProduct.map(prod =>
                    <div className="col-6 mb-3" key={prod.id}>
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
                                        <tr>
                                            <td colSpan="2"><hr></hr></td>
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
                            {this.props.customer.isAuth &&
                                <div className="card-footer">
                                    <button className="btn btn-outline-success float-right" onClick={this.addProductAtBox.bind(this, prod.id, prod.name)}>В корзину</button>
                                </div>
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default HomeListComp;