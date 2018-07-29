import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    list: [],
    isLoading: true,
    error: undefined
  }

  // TODO: If the word searched doesn't exist I want to add an error message

  submitHandler = async (e) => {
    e.preventDefault();
    const userWord = e.target.elements.userWord.value;
    const api_call = await fetch('http://api.pearson.com/v2/dictionaries/entries?headword=' + `${userWord}`)
    const data = await api_call.json();
    const list = data.results.map(data => (
      {
        headword: `${data.headword}`,
        id: `${data.id}`,
        part_of_speech: `${data.part_of_speech}`,
        definition: `${data.senses["0"].definition}`
      }
    ))
    this.setState({
      list,
      isLoading: false,
      error: ""
    })
  }

  render() {
    const {isLoading, list} = this.state;
    return (
      <div className="container">
        <h1>Dictionary</h1>
        <form onSubmit={this.submitHandler}>
          <input placeholder="Search..." type="text" name="userWord"></input>
        </form>

        <div className="search-list">
          { !this.state.isLoading && <h2>Search Results</h2> }
          {
            !isLoading && list.length > 0 ? list
              .filter(word => word.definition !== "undefined")
              .map(word => {
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
