import React, { Component } from "react";
import api from "../api/posts.js";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeExercisename = this.onChangeExercisename.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      exercisename: "",
      duration: 0,
      users: [],
      exercisetypes: [],
    };
  }

  async componentDidMount() {
    await api.get("/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    }).catch((err) => console.log(err));
    
    await api.get("/exercisetypes/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          exercisetypes: res.data,
        });
      }
    }).catch((err) => console.log(err));
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
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
          <div className="form-group">
            <label>User name:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
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
