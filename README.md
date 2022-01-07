# CoinGecko Exchanges App

This is a React App that utilizes the CoinGecko API to display a directory of exchanges.
* On the homepage component, the CoinGecko API is called to return the exchanges, which is then used to update the component state.
* A paginated table is returned which displays data from the component state, including the name, country, logo, and more.
* Each table row has a link to an information page. The information page uses the exchange is as a url parameter.
* Using the react-router-dom system, the table will link to the information page, which uses the id in the url to call the CoinGecko API for more detailed information about the exchange.
* The information component consists of a Back to Home button and information about the exchange logo, name, year established, country, description, trust rank, and social media links and icons.

Notes about Installation:
* There should be no other installation steps outside of performing npm install.

Browser support:
* All work was tested on the latest version of Chrome (Version 97.0.4692.71)


[Visit the fully deployed app on Vercel](https://coingecko-exchanges.vercel.app/)
