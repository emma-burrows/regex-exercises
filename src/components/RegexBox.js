import React, { Component } from "react";

class RegexBox extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: this.props.inputValue }
  }

  componentDidUpdate(oldProps) {
    if (this.props.inputValue !== oldProps.inputValue) {
      this.setState({ inputValue: this.props.inputValue })
    }
  }

  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
    this.props.onInputChange(evt);
  };

  onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      this.props.onNavigationChange('next')
    }
  };

  render() {
    const status = (this.props.status === 'danger') ? 'error' : this.props.status;
    return (
      <div className="form-group">
        <label htmlFor="fancy-input">Enter your Regular Expression:</label>

        <div className={`input-group has-${status}`}>
          <div className="input-group-addon">/</div>
          <input type="text" id="fancy-input"
                 className="form-control"
                 autoComplete="off"
                 value={ this.state.inputValue }
                 onKeyDown={ (e) => this.onKeyDown(e) }
                 onChange={ evt => this.updateInputValue(evt) }/>

          <div className="input-group-addon">/igm</div>
        </div>
      </div>
    );
  }
}

export default RegexBox;