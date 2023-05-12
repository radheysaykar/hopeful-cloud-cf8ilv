import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => {
  return (
    <tr>
      <td>{props.exercise.exercisename}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.calories}</td>
      <td>
        <Link to={"/edit/" + props.exercise._id}>edit</Link>|{" "}
        <a
          href="#"
          onClick={() => {
            props.deleteExercise(props.exercise._id);
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
            onclick={() => {
              props.markAsDone(props.exercise._id);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    // axios
    //   .get("http://cf8ilv-5000.csb.app/users/" + this.props.username.username)
    //   .then((res) => {
    //     console.log(res.data.username);
    //   });
    // document.getElementById("usercalleries").innerHTML =
    //   user.calgoal_completed + "/" + user.calgoal;
    {
      /* <div id="usercalleries"></div> */
    }
    // console.log(user);
    axios
      .get(
        "https://cf8ilv-5000.csb.app/exercises/find/" +
          this.props.username.username
      )
      .then((res) => {
        this.setState({
          exercises: res.data,
        });
        console.log("Hi");
        console.log("exercise" + this.props.username.username);
      });
  }

  deleteExercise(id) {
    axios.delete("https://cf8ilv-5000.csb.app/exercises/" + id).then((res) => {
      console.log(res.data);
      this.setState({
        exercises: this.state.exercises.filter((el) => el._id !== id),
      });
    });
  }

  markAsDone(id) {
    let done_exercise;
    axios.get("https://cf8ilv-5000.csb.app/exercises/" + id).then((res) => {
      console.log(res.data);
      done_exercise = res.data;
    });
    done_exercise.done = true;
    axios
      .post("https://cf8ilv-5000.csb.app/exercises/update/" + id)
      .then((res) => {
        console.log(res.data);
      });
  }

  exerciseList() {
    console.log("Hiiii");
    return this.state.exercises.map((currentexercise) => {
      console.log(currentexercise);
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          markAsDone={this.markAsDone}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.username.username}'s schedule:</h1>
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
