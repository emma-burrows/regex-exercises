import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import data from "../exercises.json";
import ExerciseBox from "./ExerciseBox";
import RegexBox from "./RegexBox";
import Navigation from "./Navigation";

const App = () => (
    <div>
      <Route path='/' component={Home}/>
    </div>
);

class Home extends Component {
  initialDefaults = {
    inputValue: '',
    status: 'default'
  };

  constructor(props) {
    super(props);
    const parseQuery = (s) => { return (s) ? s.substr(s.indexOf('=') + 1) : 1};
    const exercise = parseQuery(this.props.location.search);
    this.state = Object.assign(this.initialDefaults, {
      exercise: data[exercise]
    });
  }

  // Handle button events
  handleNavigationChange = (dir) => {
    const currentId = this.state.exercise.id;
    const nextId = (dir === 'next') ? currentId + 1 : currentId - 1;
    const latestId = localStorage.getItem('latestId') || 1;
    if (latestId < nextId) { localStorage.setItem('latestId', nextId.toString())};
    this.props.history.push({search: `?ex=${nextId}`});
    this.setState(Object.assign(this.initialDefaults, { exercise: data[nextId] }));
  };

  // Handle changes in the input box
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    const status = ( inputValue === '' ) ? 'default' : this.state.status;
    this.setState({ inputValue, status });
  };

  // Handle success of the Regex match
  handleStatusChange = (status) => {
    this.setState({ status })
  };

  render() {
    return (
          <div>
            <header>
              <h1>{ `Exercise ${this.state.exercise.id} - ${this.state.exercise.title}` }</h1>
            </header>

            <RegexBox exercise={ this.state.exercise }
                      inputValue={ this.state.inputValue }
                      status={ this.state.status }
                      onInputChange={ this.handleInputChange }
                      onNavigationChange={ this.handleNavigationChange }/>

            <ExerciseBox exercise={ this.state.exercise }
                         inputValue={ this.state.inputValue }
                         status={ this.state.status }
                         onStatusChange={ this.handleStatusChange }/>


            <Navigation exercise={ this.state.exercise }
                        status={ this.state.status }
                        max={ Object.keys(data).length }
                        onNavigationChange={ this.handleNavigationChange }/>

          </div>

    );
  }
}

export default App;
