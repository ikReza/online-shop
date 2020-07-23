import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/screen/Home";
import SignIn from "./components/SignIn";
import ProductScreen from "./components/screen/ProductScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartScreen from "./components/screen/CartScreen";
import Register from "./components/screen/RegisterScreen";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/product/:id" exact component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/register" component={Register} />
      <Footer />
    </Router>
  );
}

export default App;
