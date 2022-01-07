import "./App.css";
import React from "react";

const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

class App extends React.Component {
  async componentDidMount() {
    await CoinGeckoClient.exchanges.all().then((data) => {
      console.log(data);
    });
  }

  constructor(props) {
    super(props);
    this.state = { exchanges: [] };
  }

  render() {
    return (
      <div id = "home">
          <h1>CoinGecko Cryptocurrency Exchanges</h1>
          <h3>Click on any exchange to see more information.</h3>
      </div>
    );
  }
}

export default App;
