# Transaction-P-L-tracker

**Why we did this app**
Most people trade crypto across a number decentralised exchanges on webapps and centralised exchanges on mobile app. 
Creating a consolidated database of all your trades becomes challenging. 
We did this tracker for users to insert their trades and track their overall P&L across the various tokens that they invest in.

**#Tech Stack**
PERN, with a mix of caulculation done on the frontend (p&L for each individul trade) and at the backend (summation of trades)

**#How it works?**
1) create an account
2) Login into your account
3) Input your trades (token, buy date, sell date and amount)
4) your buy and sell price is caluclated automatically by using prices from coingecko API based on the historical price
5) All transactions are store into your personal transaction log
6) Summarize all your trades to get an overall P&L for all the trades summarized by the tokens. For example if you made 5 trades for bitcoin, the app will summarize the P&L of these 5 trades for you.

**#Biggest challenge**
1) Translating Postgres query language into JS


