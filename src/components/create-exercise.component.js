import React, { Component } from "react";
import api from "../api/posts.js";
import { AssertionComponent } from '../function.js';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeExercisename = this.onChangeExercisename.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      exercisename: "",
      duration: 0,
      exercisetypes: [],
    };
  }

  async componentDidMount() {
    AssertionComponent(this.props.username, "User not logged in");
    this.setState({
      username: this.props.username,
    });

    await api.get("/exercisetypes/").then((res) => {
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

    console.log("exercise of that user ", exercise);

    await api
    .post("/exercises/add", exercise)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))

    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Create new exercise log</h3>
        <form onSubmit={this.onSubmit}>
        <br/>
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
          <br/>
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
          <br/>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
