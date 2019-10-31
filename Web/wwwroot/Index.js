import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import HomeBaseComp from "./Components/HomeBaseComp";
import ProductBaseComp from "./Components/ProductBaseComp";
import CustomerBaseComp from "./Components/CustomerBaseComp";
import StaffBaseComp from "./Components/StaffBaseComp";

if(document.getElementById("HomeBaseComp")) {
    ReactDOM.render(
        <HomeBaseComp />,
        document.getElementById("HomeBaseComp")
    );
}

if(document.getElementById("ProductBaseComp")) {
    ReactDOM.render(
        <ProductBaseComp />,
        document.getElementById("ProductBaseComp")
    );
}

if(document.getElementById("CustomerBaseComp")) {
    ReactDOM.render(
        <CustomerBaseComp />,
        document.getElementById("CustomerBaseComp")
    );
}

if(document.getElementById("StaffBaseComp")) {
    ReactDOM.render(
        <StaffBaseComp />,
        document.getElementById("StaffBaseComp")
    );
}