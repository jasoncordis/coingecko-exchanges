import "./Home.css"
import React from "react";

const CoinGecko = require("coingecko-api");                                                                                 //require CoinGecko API

const CoinGeckoClient = new CoinGecko();                                                                                    //CoinGecko client for making API calls

class Home extends React.Component {
  async componentDidMount() {
    await CoinGeckoClient.exchanges.all().then((data) => {                                                                  //call CoinGecko API to return exchanges
      console.log(data);
      const exchanges = [];
      var exchangesDefault = [];
      for (var i = 0; i < 10; i++) {                                                                                        //push first 10 exchanges into exchanges list
        exchanges.push(data.data[i]);                                                        
        if(exchanges[i].url.includes("r.")){
          exchanges[i].url = exchanges[i].url.substring(exchanges[i].url.indexOf("."));                                     //fixes error that hides link for kraken because webpage doesn't recognize "r.kraken" suffix web prefix
          exchanges[i].url = "https://www" + exchanges[i].url
          exchanges[i].url = exchanges[i].url.substring(0,exchanges[i].url.lastIndexOf('/')+1)
        }
      }
      exchangesDefault =  exchanges.slice(0, 5);                                                                            //first 5 exchanges will be displayed on page load by default
      this.setState({
        exchanges: exchanges,                                                                                               //sets exchanges list to exchanges in state
        exchangesDefault: exchangesDefault
    });
    });
  }

  constructor(props) {
    super(props);
    this.state = { 
        exchanges: [],
        exchangesDefault: [],
     };
  }

  updateTable = (page) => {
      var begin;
      var end;
      if(page === 1){                                                                                                      //if first page is selected, exchanges 1-5 in the list will be displayed
          begin = 0;
          end = 5;
          document.getElementById('pageNum').innerHTML = "Page 1 (Exchanges 1-5)"

      }
      if(page === 2){                                                                                                      //if second page is selected, exchanges 6-10 in the list will be displayed
          begin = 5;
          end = 10;
          document.getElementById('pageNum').innerHTML = "Page 2 (Exchanges 6-10)"

      }
      var count = 0;
      for(var x = begin; x < end; x++){
      document.getElementById('name'+count).innerHTML = this.state.exchanges[x].name;                                      //updates table columns for the exchanges of current page
      document.getElementById('country'+count).innerHTML = this.state.exchanges[x].country;
      document.getElementById('image'+count).src = this.state.exchanges[x].image;
      document.getElementById('rank'+count).innerHTML = this.state.exchanges[x].trust_score_rank;
      document.getElementById('url'+count).innerHTML = this.state.exchanges[x].url;

      document.getElementById('a-name'+count).href = this.state.exchanges[x].id;                                           //updates table links to exchanges of current page 
      document.getElementById('a-country'+count).href = this.state.exchanges[x].id;
      document.getElementById('a-image'+count).href = this.state.exchanges[x].id;
      document.getElementById('a-rank'+count).href = this.state.exchanges[x].id;
      document.getElementById('a-website'+count).href = this.state.exchanges[x].url;
      count++;
      }
}   

  render() {
    return ( 
      <div id = "home"> 
          <h1>CoinGecko Cryptocurrency Exchanges</h1>
          <h3>Click on any exchange to see more information.</h3>                                                                                     
          <div id = "buttons"><br></br> 
          <button className = "pageButton" onClick={() => { this.updateTable(1)}}>Page 1</button>                                               
          <button className = "pageButton" onClick={() => { this.updateTable(2)}}>Page 2</button>                                           
          </div>
          <table id = "homeDirectory">
          <tbody>
          <tr>
                <th> Name </th> 
                <th> Country </th> 
                <th> Logo </th>            
                <th> Trust Rank </th> 
                <th> Website </th>
          </tr>
          {this.state.exchangesDefault.map(function (exchange, idx) {                                                      //returns table of the exchanges list in state with name, country, logo, trust rank, and website
            return (
              <tr key = {idx} className = "trow">
                <td>
                  <a href={exchange.id} className = "id" id = {"a-name" + idx}>                                           {/*link to info page*/}
                  <div className = "exchangeName" id = {"name" + idx}>{exchange.name} </div>                              {/*displays name of exchange*/}
                  </a>
                </td> 
                <td> 
                  <a href={exchange.id} className = "id" id = {"a-country" + idx}>                                        {/*link to info page*/}
                  <div className = "exchangeCountry" id = {"country" + idx}> {exchange.country} </div>                    {/*displays exchange country*/}
                  </a> 
                </td> 
                <td>  
                  <a href={exchange.id} className = "id" id = {"a-image" + idx}>                                           {/*link to info page*/}
                  <div className = "image">
                  <img src={exchange.image} id = {"image" + idx} alt={exchange.name}></img>                                {/*displays exchange logo*/}
                  </div>
                  </a>
                </td> 
                <td> 
                  <a href={exchange.id} className = "id" id = {"a-rank" + idx}>                                             {/*link to info page*/}
                  <div className = "exchangeRank" id = {"rank" + idx}> {exchange.trust_score_rank} </div>                   {/*displays exchange trust rank*/}
                  </a> 
                </td> 
                <td> 
                  <a href={exchange.url} className = "website" id = {"a-website" + idx}>                                    {/*link to exchange website*/}
                  <div className = "exchangeUrl" id = {"url" + idx}> {exchange.url} </div>                                  {/*displays exchange website*/}
                  </a> 
                </td> 
            </tr>
            );
          })}
        </tbody>
        </table>
        <h3 id = "pageNum">Page 1 (Exchanges 1-5)</h3>
      </div>
    );
  }
}

export default Home;