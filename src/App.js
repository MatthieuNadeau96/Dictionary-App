import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

    fetch('http://api.pearson.com/v2/dictionaries/entries?headword=dog')
    .then(response => response.json())
    // .then(parsedJSON => console.log(parsedJSON.results))
    .then(parsedJSON => parsedJSON.results.map(data => (
      {
        headword: `${data.headword}`,
        id: `${data.id}`,
        part_of_speech: `${data.part_of_speech}`,
        definition: `${data.senses["0"].definition}`
      }
    )))
    .then(list => this.setState({ list, isLoading: false }))
    .catch(error => console.log('parsing failed', error))

  }

  render() {
    const {isLoading, list} = this.state;
    return (
      <div className="container">
        <h1>Dictionary</h1>
        <input type="text"></input>

        <div className="search-list">
          <h2>Search Results</h2>
          {
            !isLoading && list.length > 0 ? list.filter(word => word.definition !== "undefined").map(word => {
              const { headword, id, part_of_speech, definition } = word;
              return (
                <div className="wordCard" key={id}>
                  <div className="top">
                    <p className="title">{headword}</p>
                    <p className="part-of-speech">{part_of_speech}</p>
                  </div>
                  <p className="definition">{definition}</p>
                </div>
              )
            }) : null
        }
        </div>

        <h4><a href="/">Matthieu Nadeau</a></h4>
      </div>
    );
  }
}

export default App;
