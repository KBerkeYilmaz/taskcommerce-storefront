import Navbar from "./Navbar/Navbar";
import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header className="w-full h-max">
        <Navbar />
      </header>
    );
  }
}

export default Header;
