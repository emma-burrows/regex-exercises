import React from "react";

export default class Navigation extends React.Component {

  handleClick = (dir) => {
    this.props.onNavigationChange(dir);
  };

  render() {
    return (
      <div>
        { ( this.props.exercise.last ) &&
        <p className="bg-info display-success">This is the end of this section of exercises.</p>
        }

        { ( this.props.exercise.currentId > 1 ) &&
        <a className="btn btn-primary" id="prev-submit"
           onClick={ () => this.handleClick('prev') }>Previous exercise</a>
        }

        { ( this.props.status === 'success' && this.props.exercise.currentId < 15 ) &&
        <a className="display-success btn btn-primary" id="next-submit"
           onClick={ () => this.handleClick('next') }>Next exercise</a>
        }
      </div>
    )
  }
}