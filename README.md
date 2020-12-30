# Paper Trader | Stock Portfolio Simulator
Paper Trader is a full-stack stock portfolio simulator with live price updates every 15 minutes. You can request to add any asset available on Yahoo Finance into a virtual portfolio, and track portfolio statistics, with data visualizations created using D3.js. 
![screenshot](https://github.com/leungjch/paper-trader-fullstack/blob/main/screenshot.png)
## Tech stack
### Frontend: 
- **React.js** for client webapp.
- **D3.js** for data visualization of portfolio with area charts, bar charts, tree maps, and donut charts. 
- **React Bootstrap and React-icons** for styling site.
### Backend:
- **PostgreSQL** for storage of transaction history and portfolio and performing simple CRUD operations.
- **Node.js** and Express.js for handling requests from client to fetch data from PostgreSQL or HTTP requests. To enable communication between the client and the database, I wrote RESTful APIs with Express route methods.
- **yfinance** Python module for obtaining stock quotas from Yahoo Finance.
- **pandas** Python module for processing stock data and performing basic dataframe operations on bulk stock data.

## Diagram of project structure
![screenshot](https://github.com/leungjch/paper-trader-fullstack/blob/main/project_diagram.png)

To read some more details over the course of the project, read the [dev diary](dev-diary.md). 
