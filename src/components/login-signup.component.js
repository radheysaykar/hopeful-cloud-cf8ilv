import React, { Component, useState, useEffect} from "react";
import api from "../api/posts.js";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeLoginUser = this.onChangeLoginUser.bind(this);
    this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCalgoal = this.onChangeCalgoal.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      calgoal: 0,
      password: "",
      loginuser: "",
      loginpassword: ""
    };
  }

  onChangeLoginUser(e) {
    this.setState({
      loginuser: e.target.value,
    })

  }

  onChangeLoginPassword(e) {
    this.setState({
      loginpassword: e.target.value,
    })

  }

  async onLogin(e) {
    e.preventDefault();
    
    try {
      const res = (await api.get("users/" + this.state.loginuser)).data;
      const user = res[0];
      if(user.password == this.state.loginpassword) 
      {
        alert("log in successful");
        localStorage.setItem('username', this.state.loginuser);
        window.location = "/";
      }
      else
      {
        alert("wrong username or password");
        console.log(user.password);
        console.log(this.state.loginpassword);
      }

    } catch (error) {
      console.log(error)
    }
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

  onChangePassword(e) {
    console.log(e);
    this.setState({
      password: e.target.value,
    })

  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      calgoal: this.state.calgoal,
      password: this.state.password
    };

    console.log("registared user:", user); 

    api
      .post("/users/add", user)
      .then((res) => {console.log(res.data); alert("new user created")}).catch((err) => alert(err.response.data));

    this.setState({
      username: "",
      calgoal: 0,
      password: ""
    });
  }

  render() {
    return (
      <div>
        <h3>login</h3>
        <form onSubmit={this.onLogin}>
          <br/>
          <div className="form-group">
            <label>username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.loginuser}
              onChange={this.onChangeLoginUser}
            />
          </div>
          <br/>
          <div className="form-group">
            <label>password: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.loginpassword}
              onChange={this.onChangeLoginPassword}
            />
          </div>
          <br/>
          <div className="form-group">
            <input
              type="submit"
              value="Log in"
              className="btn btn-primary"
            />
          </div>
          <br/>
        </form>
        <h3>If new to exerciseTracker Create new user:</h3>
        <form onSubmit={this.onSubmit}>
          <br/>
          <div className="form-group">
            <label>username (Username should be atleast 3 characters): </label>
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
            <label>create password (password should be atleast 8 characters): </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
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
