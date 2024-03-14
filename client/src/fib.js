import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
    getError: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("/api/values", {
        index: this.state.index,
      });
      return result;
    } catch (err) {
      this.setState({
        getError: err.response.data,
      });
      console.log(err.response);
    }

    this.setState({
      index: "",
    });
  };

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({
      values: values.data,
    });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  renderSeenIndex() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  renderCalculatedValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For Index {key} I calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
          <label>Enter your Index::</label>

          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <span className="errorLog">{this.state.getError}</span>

        <h3>Indexes i Have seen:</h3>
        {this.renderSeenIndex()}

        <h3>Calculated Values:</h3>
        {this.renderCalculatedValues()}
      </div>
    );
  }
}

export default Fib;
