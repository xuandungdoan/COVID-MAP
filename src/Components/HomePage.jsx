import React, { Component } from "react";

class HomePage extends Component {
  render() {
    return (
      <header className="masthead d-flex mt-5">
        <div className="container text-center my-auto">
          <h1 className="mb-1">A Beehexa Intern Project</h1>
          <h3 className="mb-5">
            <em> Against Covid-19</em>
          </h3>
        </div>
        <div className="overlay" />
      </header>
    );
  }
}

export default HomePage;
