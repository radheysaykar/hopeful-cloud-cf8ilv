import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/posts.js";



class ExercisesList extends Component {
  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this);
    // this.markAsDone = this.markAsDone.bind(this);

    this.state = {
      exercises: [],
      user: {}
    };
  }

  componentDidMount() {
    api
      .get(
        "/exercises/find/" +
          this.props.username.username
      )
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
        console.log("exercise" + this.props.username.username);
      }).catch((err) => console.log(err));
  
    api
      .get(
        "/users/" +
          this.props.username.username
      )
      .then((res) => {
        this.setState({
          user: res.data[0],
        });
        console.log("user_calories_goal:", this.state.user.calgoal);
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

  async markAsDone(id) {
    try {
      let done_exercise = {};

      done_exercise = (await api.get("/exercises/" + id)).data;

      done_exercise.done = true;
      console.log(done_exercise);
      
      let res = await api.post("/exercises/update/" + id, done_exercise);
      console.log(res.data);
      
      let exercise_user = this.state.user;

      exercise_user.calgoal_completed += done_exercise.calories;

      this.setState({
        user: exercise_user,
      })
      console.log("exercise_user:   ",exercise_user);

      res = await api.post("/users/update/" + this.state.user.username, exercise_user);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  }

   Exercise = (exercise) => {
    return (
      <tr>
        <td>{exercise.exercisename}</td>
        <td>{exercise.duration}</td>
        <td>{exercise.calories}</td>
        <td>
          <Link to={"/edit/" + exercise._id}>edit</Link>|{" "}
          <a
            href="#"
            onClick={() => {
              this.deleteExercise(exercise._id);
            }}
          >
            delete
          </a>{" "}
        </td>
        <td>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onClick={() => {
                this.markAsDone(exercise._id);
              }}
            />
          </div>
        </td>
      </tr>
    );
  };

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      console.log(currentexercise);
      return (
        this.Exercise(currentexercise)
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.username.username}'s schedule:</h1>
        <h3 style={{ textAlign: 'right' }}>calories goal completed:{this.state.user.calgoal_completed}/{this.state.user.calgoal} <Link to={"/create/"}>➕</Link></h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Exercise</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Actions</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

const UserDetaills = () => {
  return <ExercisesList username={useParams()} />;
};

export default UserDetaills;
