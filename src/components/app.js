import React, { Component } from "react";

import SearchBar from "./search_bar";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>World Clock</h1>
        <SearchBar />
      </div>
    );
  }
}
