import React, { Component } from 'react';
import data from "../exercises.json";
import ExerciseBox from "./ExerciseBox";
import RegexBox from "./RegexBox";
import Navigation from "./Navigation";

class App extends Component {
  initialDefaults = {
    inputValue: '',
    status: 'default'
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.initialDefaults, {
      exercise: data["ex1"]
    });
  }

  // Handle button events
  handleNavigationChange = (dir) => {
    if (dir === 'next')
      this.setState(Object.assign(this.initialDefaults, { exercise: data["ex2"] }));
    else
      this.setState(Object.assign(this.initialDefaults, { exercise: data["ex1"] }));
  };

  // Handle changes in the input box
  handleInputChange = (e) => {
    const inputValue = e.target.value;
    const status = (inputValue === '') ? 'default' : this.state.status;
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
          <h1>{ this.state.exercise.title }</h1>
        </header>

        <ExerciseBox exercise={ this.state.exercise }
                     inputValue={ this.state.inputValue }
                     status={ this.state.status }
                     onStatusChange={ this.handleStatusChange }/>

          <RegexBox exercise={ this.state.exercise }
                    status={ this.state.status }
                    inputValue={ this.state.inputValue }
                    onInputChange={ this.handleInputChange }/>

          <Navigation exercise={ this.state.exercise }
                      status={ this.state.status }
                      onNavigationChange={ this.handleNavigationChange }/>
      </div>
    );
  }
}

export default App;
