import logo from './logo.svg';
import './App.css';

function App() {


  function getUser() {
    console.log("Helldo");
    fetch('/api/users')
    .then((response) => response.json())
    .then((data) => console.log("DATA", data[0]['username']));
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
        <button onClick = {getUser}>Buy</button>
      </header>
    </div>
  );
}

export default App;
