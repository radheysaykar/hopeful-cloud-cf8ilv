import React, { Component } from "react";
import api from "../api/posts.js";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCalgoal = this.onChangeCalgoal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      calgoal: 0,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
    const user = {
      username: e.target.value,
    };
    console.log(user);
  }

  onChangeCalgoal(e) {
    this.setState({
      calgoal: e.target.value,
    });
    const cal = {
      calgoal: e.target.value,
    };
    console.log(cal);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      calgoal: this.state.calgoal,
    };

    console.log(user); 

    api
      .post("/users/add", user)
      .then((res) => console.log(res.data)).catch((err) => console.log(err));
    
      api
      .post("/exercises/add", {
        "username": "radhey",
                "exercisename": "running",
                "duration": 99
        })
      .then((res) => console.log(res.data)).catch((err) => console.log(err));    

    this.setState({
      username: "",
      calgoal: 0,
    });
  }

  render() {
    return (
      <div>
        <h3>Create new user:</h3>
        <h6>(Username should be atleast 3 characters)</h6>
        <form onSubmit={this.onSubmit}>
          <br/>
          <div className="form-group">
            <label>username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <br/>
          <div className="form-group">
            <label>calories goal: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.calgoal}
              onChange={this.onChangeCalgoal}
            />
          </div>
          <br/>
          <div className="form-group">
            <input
              type="submit"
              value="Creat User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
