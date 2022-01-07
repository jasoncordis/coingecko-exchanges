import React from "react";

const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

class App extends React.Component {
  async componentDidMount() {
    await CoinGeckoClient.exchanges.all().then((data) => {
      console.log(data);
      const exchanges = [];
      for (var i = 0; i < 10; i++) {                                                          //push first 10 exchanges into exchanges list
        exchanges.push(data.data[i]);                                                        
        if(exchanges[i].url.includes("r.")){
          exchanges[i].url = exchanges[i].url.substring(exchanges[i].url.indexOf("."));        //fixes error that hides link for kraken because webpage doesn't recognize "r.kraken" suffix web prefix
          exchanges[i].url = "https://www" + exchanges[i].url
          exchanges[i].url = exchanges[i].url.substring(0,exchanges[i].url.lastIndexOf('/')+1)
        }
      }
      this.setState({
        exchanges: exchanges                                                                      //sets exchanges list to exchanges in state
      });
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
          <table id = "homeDirectory">
          <tbody>
          <tr>
                <th> Name </th> 
                <th> Country </th> 
                <th> Logo </th>
                <th> Trust Rank </th> 
                <th> Website </th>
          </tr>
          {this.state.exchanges.map(function (exchange, idx) {                                                            //returns table of the exchanges list in state with name, country, logo, trust rank, and website
            return (
              <tr key = {idx} class = "trow">
                <td><a href={exchange.id}><div className = "exchangeName">{exchange.name} </div></a></td> 
                <td> <a href={exchange.id}><div className = "exchangeCountry"> {exchange.country} </div></a> </td> 
                <td>  <a href={exchange.id}> <img src={exchange.image} alt={exchange.name}></img>{" "}</a></td> 
                <td> <a href={exchange.id}><div className = "exchangeRank"> {exchange.trust_score_rank} </div></a> </td> 
                <td> <a href={exchange.url}><div className = "exchangeUrl"> {exchange.url} </div></a> </td> 
            </tr>
            );
          })}
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;