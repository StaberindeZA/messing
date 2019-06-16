import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUpload from './ImageUpload';

class FetchZone extends React.Component {
  constructor(props) {
    super(props);
    this.getDefaultMessage = this.getDefaultMessage.bind(this);

    this.state = {
      message: "hello again"
    };
  }

  async getDefaultMessage() {
    return "This is the standard";
  }

  getDefault() {
    return this.state.message;
  }

  componentDidMount() {
    const promise = this.getDefaultMessage();
    console.log(promise);
    promise.then((value) => {
      this.setState({message: value});
    });
  }

  handleSubmit = (file) => {
    console.log('File', file);
  }

  handleClick = () => {
    console.log('Clicked');
  }
  
  render () {
    return (
      <div>
        {this.state.message}
        <ImageUpload 
          onFormSubmit={this.handleSubmit}
          onFormClick={this.handleClick}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="fetchZone">
        <FetchZone />
      </div>
    </div>
  );
}

export default App;
