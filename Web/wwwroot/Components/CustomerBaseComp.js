import React from "react";
import CustomerHistoryComp from "./CustomerHistoryComp";
import CustomerPresonalComp from "./CustomerPersonalComp";
import CustomerPersonalComp from "./CustomerPersonalComp";

export default class CustomerBaseComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ul className="nav nav-tabs" id="customerTab">
                    <li className="nav-item">
                        <a className="nav-link active" id="history_tab" data-toggle="tab" href="#history" aria-controls="history" aria-selected="true">История</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="personalData_tab" data-toggle="tab" href="#personalData" aria-controls="personalData" aria-selected="true">Персональные данные</a>
                    </li>
                </ul>
                <div className="tab-content pt-3" id="customerTabContent">
                    <div className="tab-pane fade show active" id="history" aria-labelledby="history_tab">
                        <CustomerHistoryComp />
                    </div>
                    <div className="tab-pane fade" id="personalData" aria-labelledby="personalData_tab">
                        <CustomerPersonalComp />
                    </div>
                </div>
            </div>
        );
    }
}