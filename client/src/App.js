import logo from './logo.svg';
import './App.css';

function App() {


  function getUser() {
    fetch('/users')
    .then(response => {
      console.log(response.text)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Your Portfolio</h1>
        <p>
          Table
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello
        </a>
        <button>Buy</button>
      </header>
    </div>
  );
}

export default App;
