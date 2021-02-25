import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import HomeScreen from "./Home";
import GlobalStyle from "../GlobalStyle";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Router history={history}>
            <GlobalStyle />
            <Navbar toggle={toggle} />
            <MobileNav isOpen={isOpen} toggle={toggle} />
            <Switch>
                <Route path="/" exact component={HomeScreen} />
            </Switch>
        </Router>
    );
}

export default App;
