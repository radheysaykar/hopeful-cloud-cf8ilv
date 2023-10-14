import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../api/posts.js";

const Exercise = (props) => {
  return (
    <tr>
      <td>
        <Link to={"/userDetails/" + props.exercise.username}>
          {props.exercise.username}
        </Link>
      </td>
      <td>{props.exercise.exercisename}</td>
      <td>{props.exercise.duration}</td>
      {/* <td>{props.exercise.date.substring(0, 10)} </td> */}
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link> |
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [
        // {
        //   username: "user5",
        //   description: "hiking",
        //   duration: 45,
        //   date: "3246547534rhghgf"
        // },
        // {
        //   username: "user5",
        //   description: "hiking",
        //   duration: 45,
        //   date: "3246547534rhghgf"
        // },
        // {
        //   username: "user5",
        //   description: "hiking",
        //   duration: 45,
        //   date: "3246547534rhghgf"
        // }
      ],
    };
  }

  componentDidMount() {
    api.get("/exercises/").then((res) => {
      this.setState({
        exercises: res.data,
      });
      console.log("Hi");
      console.log(this.state.exercises);
    }).catch((err) => console.log(err));
  }

  deleteExercise(id) {
    api.delete("/exercises/" + id).then((res) => {
      console.log(res.data);
      this.setState({
        exercises: this.state.exercises.filter((el) => el._id !== id),
      });
    }).catch((err) => console.log(err));
  }

  exerciseList() {
    console.log("Hiiii");
    return this.state.exercises.map((currentexercise) => {
      console.log(currentexercise);
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Logged Exercises</h1>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
