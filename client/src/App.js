import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Exercise = { name, weight };
    axios({
      url: "/api",
      method: "POST",
      data: Exercise,
    })
      .then(() => console.log("Data has been sent"))
      .catch((err) => console.log(err));
    setName("");
    setWeight("");
  };

  const getExercises = () => {
    axios("api")
      .then((res) => {
        const data = res.data;
        setExercises(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExercises();
  });

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            name="weight"
            value={weight}
            placeholder="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
      <div className="blog">
        {exercises.map((exercise, index) => {
          return (
            <div key={index}>
              <h1>{exercise.name}</h1>
              <p>{exercise.weight}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
