import React, { Component } from "react";
import ListItem from "./components/ListItem";
import checkValid from "./util/CheckValid";
import calculateData from "./util/CalculateData";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      givenString: "",
      items: [],
      error: false,
      fractions: [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50],
      msg: "Ex. Rp 5000 | Rp 5.000 | 5000 | 5.000 | 005000 | 005.000"
    };
  }

  onChange(e) {
    this.setState({ givenString: e.target.value });
  }

  calculateData() {
    let amount = checkValid(this.state.givenString);
    if (!amount.error) {
      let array = calculateData(amount.value, this.state.fractions);
      this.setState({
        items: array,
        error: false,
        msg: "Ex. Rp 5000 | Rp 5.000 | 5000 | 5.000 | 005000 | 005.000"
      });
    } else {
      this.setState({
        error: true,
        msg: amount.msg
      });
    }
  }

  render() {
    let form = (
      <div className="form">
        <div className="title">
          <p>Roepiah</p>
          <p>Calculator</p>
        </div>
        <div className="input-form">
          <input
            type="text"
            placeholder="Write amount of rupiah"
            onChange={this.onChange.bind(this)}
            className={this.state.error ? 'red-line' : 'green-line'}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.calculateData()
              }
            }}
          />
          {!this.state.error && <p className="grey-color">{this.state.msg}</p>}
          {this.state.error && <p className="red-color">{this.state.msg}</p>}
        </div>
        <div className="button">
          <div className="btn" onClick={this.calculateData.bind(this)}>
            <p>Calculate</p>
          </div>
        </div>
      </div>
    );

    let list = (
      <div className="list">
        {this.state.items.length > 0 && this.state.items.map((item, key) => {
          return <ListItem key={key} kurs={item.kurs.toLocaleString('id')} amount={item.amount} />;
        })}
        {this.state.items.length === 0 && <div className="no-record">
          <p>No Record to Display</p>
        </div>}
      </div>
    );

    return (
      <div className="app">
        {form}
        {list}
      </div>
    );
  }
}

export default App;
