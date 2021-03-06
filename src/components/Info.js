import "./Info.css";
import React from "react";

const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

class Info extends React.Component {
  async componentDidMount() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/")+1)                                         //id of exchange is taken from url parameter
    console.log(id)

    await CoinGeckoClient.exchanges.fetch(id).then((data) => {                              //information about the exchange is fetched by id using CoinGecko API
      const exchange = data.data
      if(exchange.year_established == null){                                                //if exchange does not have the year established on hte CoinGeckoAPI it is set to 'N/A'
          exchange.year_established = "N/A"
      }
      if(exchange.description === "")                                                       //if exchange do not have a description on the CoinGecko API, it is set to 'N/A'
        exchange.description = "N/A"
        if(exchange.url.includes("r.")){
            exchange.url = exchange.url.substring(exchange.url.indexOf("."));                //fixes error that hides link for kraken because webpage doesn't recognize "r.kraken" suffix web prefix
            exchange.url = "https://www" + exchange.url
            exchange.url = exchange.url.substring(0,exchange.url.lastIndexOf('/')+1)
            }
      console.log(exchange);
      this.setState({
        exchange: exchange
      });
      this.socialLinks()
    });

  }

  constructor(props) {
    super(props);
    this.state = { exchange: [] };
  }

   socialLinks = () => {
                
            if(this.state.exchange.reddit_url !== ""){                                                        //Reddit link and image for this exchange is only displayed if Reddit link is found by CoinGeckoAPI                                           
                const reddit_url = this.state.exchange.reddit_url;
                const reddit_image =  "/images/reddit.png"
                var reddit = document.createElement('a');
                reddit.href = reddit_url
                var redditImage = document.createElement("img");
                redditImage.className = "logo"
                redditImage.setAttribute('src', reddit_image);/*sample pic*/
                document.getElementById('socials').appendChild(reddit).appendChild(redditImage);              //Reddit link and image is appended to socials div
            }
            if(this.state.exchange.facebook_url !== ""){                                                      //Facebook link and image for this exchange is only displayed if Facebook link is found by CoinGeckoAPI                                           
                const facebook_url = this.state.exchange.facebook_url;
                const facebook_image =  "/images/facebook.png"
                var facebook = document.createElement('a');
                facebook.href = facebook_url
                var facebookImage = document.createElement("img");
                facebookImage.className = "logo"
                facebookImage.setAttribute('src', facebook_image);/*sample pic*/
                document.getElementById('socials').appendChild(facebook).appendChild(facebookImage);           //Facebook link and image is appended to socials div
            }
            if(this.state.exchange.twitter_handle !== ""){                                                      //Twitter link and image for this exchange is only displayed if Twitter link is found by CoinGeckoAPI                                           
                const twitter_url = "https://www.twitter.com/" + this.state.exchange.twitter_handle;
                const twitter_image =  "/images/twitter.png"
                var twitter = document.createElement('a');
                twitter.href = twitter_url
                var twitterImage = document.createElement("img");
                twitterImage.className = "logo"
                twitterImage.setAttribute('src', twitter_image);/*sample pic*/
                document.getElementById('socials').appendChild(twitter).appendChild(twitterImage);             //Twitter link and image is appended to socials div
            }
} 

  render() {
    return (
      <div id = "info">
          <div id = "child">
            <a href = "/"><button id = "homeButton">Back to Home</button></a> <br></br>
            <img src = {this.state.exchange.image} className = "logo" alt = "logo"></img>
            <h1>{this.state.exchange.name}</h1>
            <h3> Year Established: {this.state.exchange.year_established}</h3>
            <h3> Country: {this.state.exchange.country}</h3>
            <h3> Description: {this.state.exchange.description}</h3>
            <h3> Trust Rank: {this.state.exchange.trust_score_rank}</h3>
            <h3> Website: <a href = {this.state.exchange.url}>{this.state.exchange.url}</a></h3>
            <div id = "socials"><h3>Socials:</h3> </div>
          </div>
      </div>
    );
  }
}

export default Info;