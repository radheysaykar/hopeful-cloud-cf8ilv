import React, { Component } from "react";
import { useParams } from "react-router-dom";
import api from "../api/posts.js";
import { AssertionComponent } from '../function.js';

class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeExercisename = this.onChangeExercisename.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      exercisename: "",
      duration: 0,
      exercisetypes: []
    };
  }

  componentDidMount() {
    
    console.log(" this.props.id ", String(this.props.id.id));
    this.setState({
      username: this.props.username,
    });

    api
      .get("/exercises/" + this.props.id.id)
      .then((res) => {
        this.setState({
          exercisename: res.data.exercisename,
          duration: res.data.duration,
        });
      }).catch((err) => console.log(err));
    
    api.get("/exercisetypes/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          exercisetypes: res.data,
        });
      }
    }).catch((err) => console.log(err));
  }

  onChangeExercisename(e) {
    this.setState({
      exercisename: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      exercisename: this.state.exercisename,
      duration: this.state.duration,
    };

    console.log(exercise);

    await api
      .post(
        "/exercises/update/" + this.props.id.id,
        exercise
      )
      .then((res) => console.log(res.data)).catch((err) => console.log(err));

    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Edit exercise log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>
              Exercise name:
              <br />
              (name | calories burnt per 15 min)
            </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.exercisename}
              onChange={this.onChangeExercisename}
            >
              {this.state.exercisetypes.map(function (exercisetype) {
                return (
                  <option
                    key={exercisetype.exercisename}
                    value={exercisetype.exercisename}
                  >
                    {exercisetype.exercisename} | {exercisetype.calper15}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>duration (in minute): </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

const ParentEditExercise = (props) => {
  AssertionComponent(this.props.username, "User not logged in");
  return <EditExercise id={useParams()} username={props.username}/>;
};

export default ParentEditExercise;
