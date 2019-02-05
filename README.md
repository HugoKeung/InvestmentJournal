Under construction.

This directory containes the Angular front-end for the web-app Investment Journal.

User can input their positions for different stocks and the rationale behind their purchase.

The website can then be used as some sort of watchlist to track their current positions by looking at the live data.
They can also look back to their rationale of their purchase to see if things went as they thought it would.

This provides good discipline for the investor to make sure they can back up every position their hold, and consider the pros and cons for every purchase they make.

Auth0 is used for authentication and authorisation for the application. (work in progress)

below show screenshot of the mainscreen (which like the rest of the project is still work in progress)

ng2-chart is used to plot the charts. The real stock price data, and the historical data and company description is pulled from: https://api.iextrading.com/
![alt-text](https://imgur.com/a/YYYC6fO)

The back-end (also under construction) is written in Spring, and can be found here:
https://github.com/HugoKeung/InvestmentJournal-Server
