import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Puppy from "./components/Puppy"
import Form from "./components/Form"

//importing all the pages that need routing

function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/puppy" component={Puppy} />
                <Route path="/form" component={Form} />
            </Switch>
        </Router>
    );
}
export default Routing

//Set up the routing for all pages and will import into the other pages to work. 