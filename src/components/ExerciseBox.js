import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

class ExerciseBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outputValue: '',
      status: this.props.status,
      search: ''
    }
  }

  componentDidUpdate(oldProps) {
    // Only make changes if the input has changed
    if (this.props.inputValue !== oldProps.inputValue) {

      if (this.props.inputValue === '') {
        // If the input is blank, we want everything to go back to the original grey state
        this.setState({ status: this.props.status, search: this.props.inputValue });
        this.props.onStatusChange('default');
      }
      else {
        // If there is some input, apply it as a regular expression to the input
        const input = this.props.inputValue;
        const matchText = this.props.exercise.text;
        let status, outputValue, search;

        try {
          const regex = new RegExp(input, 'igm');
          const result = matchText.match(regex);
          console.log(`Result: ${result} - Expected: ${this.props.exercise.expected}`);
          search = input;

          // We have a result - it's either what we're expecting or something else
          status = ( result.join(',') === this.props.exercise.expected ) ? 'success' : 'warning';
          outputValue = <ol>{ result.map((r, i) => <li key={ i }>{ r }</li>) }</ol>;
        } catch (e) {
          // We have no result or the Regex is invalid, make everything red
          status = 'danger';
          search = '';
        }
        // Apply the changes to this component and send them back to the parent component
        this.setState({ outputValue, status, search });
        this.props.onStatusChange(status);
      }
    }
  }


  render() {
    const ulClass = `list-group ${( this.props.inputValue === '' || this.state.status === 'danger' ) ? "hidden" : ''}`;

    return (
        <div className={ `panel panel-${this.state.status}` } id="panel">
          <div className="panel-heading">
            <h2 className="panel-title" id="instructions">{ this.props.exercise.instructions }</h2>
          </div>
          <div className="panel-body">
            <Highlighter id="match-text" searchWords={ [this.state.search] }
                         autoEscape={ false } style={ { whiteSpace: 'pre-wrap' } }
                         textToHighlight={ this.props.exercise.text }
                         highlightClassName="highlight"/>
          </div>

          <ul className={ ulClass }>
            <li className="list-group-item" id="result">{ this.state.outputValue }</li>
          </ul>
        </div>
    );
  }
}

export default ExerciseBox;
