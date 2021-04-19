import React, { useState } from "react";
import axios from "axios";
import myFuncs from "../utility/functions";
import HandleQuery from "./HandleQuery";
import { useHistory } from "react-router-dom";

import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Input() {
  let query = useQuery();
  let history = useHistory();

  const [author, setAuthor] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [improvement, setImprovement] = useState("");
  const [exerciseType, setExerciseType] = useState("min");

  const [nameError, setNameError] = useState("");
  const [exerciseError, setExerciseError] = useState("");
  const [maxError, setMaxError] = useState("");

  const validateError = () => {
    if (author === "" || author.length < 2 || /[^a-zA-Z]/.test(author)) {
      setNameError("invalid name");
      return false;
    }
    if (exerciseName === "" || exerciseName.length < 2) {
      setExerciseError("invalid exercise name");
      return false;
    }
    if (
      improvement === "" ||
      improvement.length > 3 ||
      !/^-?\d+\.?\d*$/.test(improvement)
    ) {
      setMaxError("invalid performance value");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError("");
    setMaxError("");
    setExerciseError("");
    let isValid = validateError();
    if (isValid) {
      const time = myFuncs.getTimePretty();
      axios
        .post("/postExercise", {
          author,
          exerciseName,
          exerciseType,
          improvement: [improvement],
          time: [time],
        })
        .then(() => console.log("Data has been sent"))
        .catch((err) => console.log(err));
      let exName = exerciseName;
      setAuthor("");
      setExerciseName("");
      setExerciseType("");
      setImprovement("");
      setNameError("");
      setMaxError("");
      setExerciseError("");
      history.push(`/?operation=insert,${exName}`);
    }
  };

  return (
    <div className="col-span-2">
      <form
        onSubmit={handleSubmit}
        className="input-bg justify-self-center rounded-lg p-5 w-full"
      >
        <h1 className="text-2xl text-gray-200">Add an exercise !</h1>

        <div className="form-input pt-2">
          <input
            className="py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            name="author"
            value={author}
            placeholder="Your name"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        {nameError ? (
          <p className="inline-block bg-red-600 text-gray-300 p-1 mt-2 rounded-lg">
            {nameError}
          </p>
        ) : (
          ""
        )}
        <div className="form-input">
          <input
            className="mt-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md
            focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            name="exercise-name"
            value={exerciseName}
            placeholder="Exercise name"
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>
        {exerciseError ? (
          <p className="inline-block bg-red-600 text-gray-300 p-1 mt-1 rounded-lg">
            {exerciseError}
          </p>
        ) : (
          ""
        )}

        <div className="flex space-x-8">
          <div className="form-input">
            <input
              className="mt-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none w-full shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              name="exercise-name"
              value={improvement}
              placeholder="Last max performance"
              onChange={(e) => setImprovement(e.target.value)}
            />
          </div>

          <div className="form-input">
            <select
              className="mt-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 w-full shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => setExerciseType(e.target.value)}
            >
              <option value="min">mins.</option>
              <option value="rep">reps.</option>
              <option value="kg">kgs.</option>
              <option value="lb">lbs.</option>
            </select>
          </div>
        </div>
        {maxError ? (
          <p className="inline-block bg-red-600 text-gray-300 p-1 mt-1 rounded-lg">
            {maxError}
          </p>
        ) : (
          ""
        )}
        <button className="block mt-2 py-2 px-4 button-green text-gray-900 font-semibold rounded-lg shadow-md active:bg-green-800 focus:outline-none">
          Submit
        </button>
      </form>
      <div>
        <HandleQuery operation={query.get("operation")} />
      </div>
    </div>
  );
}

export default Input;
