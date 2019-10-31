import React from "react";
import jQuery from "jquery";
import StaffAddComp from "./StaffAddComp";
import StaffListComp from "./StaffListComp";

export default class StaffBaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { sellers: [] };

        this.updateListSellers = this.updateListSellers.bind(this);
        this.updateListSellers();
    }

    updateListSellers() {
        jQuery.post({
            url: "/Staff/GetListSellers",
            context: this
        }).done(function(data) {
            this.setState({ sellers: data });
        });
    }

    render() {
        return (
            <div>
                <StaffAddComp updateListSellers={this.updateListSellers} />
                <StaffListComp sellers={this.state.sellers} updateListSellers={this.updateListSellers} />
            </div>
        );
    }
}