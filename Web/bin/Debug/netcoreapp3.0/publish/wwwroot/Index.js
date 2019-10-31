import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import AddProductComp from "./Components/AddProductComp";

ReactDOM.render(
    <AddProductComp />,
    document.getElementById("AddProductComp")
)