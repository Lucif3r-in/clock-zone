import React, { Component } from "react";
import "../index.css";
import SearchBar from "./search_bar";
import ClockList from "./clock_list";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="navbar">
          <span className="nav-name">Clock Zone</span>
          <a href="https://github.com/Lucif3r-in/clock-zone">Fork</a>
        </div>
        <SearchBar />
        <ClockList />
        <div className="footer">
          Made with :love: by{" "}
          <a href="https://github.com/Lucif3r-in">Ashutosh Rath</a>🪶
        </div>
      </div>
    );
  }
}
