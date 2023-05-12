import React, { Component } from "react";
import axios from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get("https://cf8ilv-5000.csb.app/users/").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }

  onChangeUsername(e) {
    window.location = "/userDetails/" + e.target.value;
  }
 
  render() {
    return (
      <div className="form-group">
        
        <label>User name:</label>
        <br/>
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
        <br/>
      </div>
    );
  }
}
