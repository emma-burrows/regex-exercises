import React from "react";

export default class Navigation extends React.Component {

  handleClick = (dir) => {
    this.props.onNavigationChange(dir);
  };

  render() {
    const exerciseId = this.props.exercise.id;
    return (
      <div>
        { ( this.props.status === 'success' && this.props.exercise.last ) &&
        <div className="alert alert-success">This is the end of this section of exercises.</div>
        }

        { ( exerciseId > 1 ) &&
        <a className="btn btn-primary" id="prev-submit"
           onClick={ () => this.handleClick('prev') }>Previous exercise</a>
        }
        <span> </span>
        { ( (this.props.status === 'success' || exerciseId < localStorage.getItem('latestId')) &&
            exerciseId < this.props.max ) &&
        <a className="display-success btn btn-primary"
           id="next-submit"
           onClick={ () => this.handleClick('next') }>Next exercise</a>
        }
      </div>
    )
  }
}