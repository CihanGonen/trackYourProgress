import React, { useState } from "react";
import { useParams } from "react-router";
import useAxios from "./useAxios";
import axios from "axios";
import { Link } from "react-router-dom";

import Chart from "./Chart";
import myFuncs from "../utility/functions";

const ExercisePage = () => {
  const { id } = useParams();
  const [improvement, setImprovement] = useState("");
  const [maxError, setMaxError] = useState("");

  const { data, isPending, error } = useAxios("getAll");

  const exercise = data.filter((elem) => elem._id === id);

  const validateError = () => {
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

  const submitFunc = (e, impArr, timeArr) => {
    setMaxError("");
    e.preventDefault();
    let isValid = validateError();
    if (isValid) {
      const time = myFuncs.getTimePretty();
      const newImp = [...impArr, Number(improvement)];
      const newTime = myFuncs.checkTime(time, timeArr);
      console.log(newImp);
      axios
        .put(`/update`, {
          newImp,
          id,
          newTime,
        })
        .then(() => console.log("Data has been sent"))
        .catch((err) => console.log(err));
      setImprovement("");
      setMaxError("");
    }
  };

  const deleteExercise = (id) => {
    axios.delete(`/delete/${id}`);
  };

  return (
    <div className="exercise-page">
      {error && <div className="col-span-2 mx-auto text-4xl">{error}</div>}
      {isPending && <div>Loading...</div>}
      {exercise.map((exercise) => {
        return (
          <div key={exercise._id}>
            <div className="flex justify-between">
              <Link to="/">
                <button className="focus:outline-none text-sm px-5 py-3 rounded-md font-semibold text-white home-button-bg ring-0">
                  Home
                </button>
              </Link>
              <Link to={`/?operation=delete,${exercise.exerciseName}`}>
                <button
                  className="focus:outline-none text-sm py-3 px-5 rounded-md font-semibold text-white bg-red-700 hover:bg-red-800 ring-0"
                  onClick={() => {
                    deleteExercise(id);
                  }}
                >
                  Delete This Exercise
                </button>
              </Link>
            </div>
            <div className="pt-5">
              <div key={exercise._id} className="grid md:grid-cols-3 gap-5">
                <div className="start-bg text-gray-900 mt-2 md:mt-1 bg-gray-300 rounded-lg p-5 shadow-md">
                  <h1 className="text-2xl">Improvement From Start</h1>
                  <div className="space-y-2 ml-5 mt-5">
                    <p>
                      The first maximum performance :{" "}
                      <span className="text-2xl">
                        {exercise.improvement[0]}
                      </span>{" "}
                      {exercise.exerciseType}'s
                    </p>
                    <p>
                      The last maximum performance :{" "}
                      <span className="text-2xl">
                        {exercise.improvement[exercise.improvement.length - 1]}
                      </span>{" "}
                      {exercise.exerciseType}'s
                    </p>
                    <p>
                      The improvement percentage :{" "}
                      <span className="text-2xl">
                        %
                        {myFuncs.percentDif(
                          exercise.improvement[0],
                          exercise.improvement[exercise.improvement.length - 1]
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="perform-bg text-gray-900 mt-2 md:mt-1 rounded-lg p-5 shadow-md">
                  <h1 className="text-2xl">Last 5 Performance</h1>
                  <div className="flex gap-1 flex-wrap content-center justify-center md:justify-start mt-5">
                    {myFuncs.reverseArr(exercise.improvement).map((elem) => {
                      return (
                        <div className="rounded-lg p-5 bg-gray-900 w-90">
                          <p className="text-sm text-gray-200">
                            {elem}
                            {exercise.exerciseType}'s
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="update-bg text-gray-900 mt-2 md:mt-1 rounded-lg p-5 shadow-md">
                  <form
                    onSubmit={(e) =>
                      submitFunc(e, exercise.improvement, exercise.time)
                    }
                    className="grid"
                  >
                    <h1 className="text-xl">Update your max performance !</h1>
                    <input
                      className="mt-2 py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none w-full shadow-md
                      focus:outline-none focus:ring-2 focus:ring-blue-600"
                      type="text"
                      name="exercise-name"
                      value={improvement}
                      placeholder="Last max performance"
                      onChange={(e) => setImprovement(e.target.value)}
                    />
                    {maxError ? (
                      <p className="inline bg-red-600 text-gray-300 p-1 mt-1 rounded-lg">
                        {maxError}
                      </p>
                    ) : (
                      ""
                    )}
                    <button className="mt-2 py-2 px-4 justify-self-center button-secondary text-white font-semibold rounded-lg shadow-md active:bg-green-700 focus:outline-none">
                      Update
                    </button>
                  </form>
                </div>
              </div>

              <div className="pt-5 mx-auto md:grid md:grid-cols-2 gap-5 md:w-3/4">
                <div className="text-gray-900 mt-2 md:mt-1 chart-bg rounded-lg shadow-md">
                  <Chart
                    key={exercise._id}
                    improvement={exercise.improvement}
                    type={exercise.exerciseType}
                    name={exercise.exerciseName}
                    author={exercise.author}
                  />
                </div>
                <div className=" text-gray-900 mt-2 md:mt-1 chart-bg rounded-lg p-5 shadow-md">
                  <p>
                    İf you just added a new max performance please refresh page
                    to update the graph.
                  </p>
                  <div className="pt-5">
                    <div className="h-4 w-4 inline-block bg-red-800 mr-1"></div>
                    Means your performance decreased and you might need some
                    rest. According to researchs rest periods are as important
                    as exercise itself. Also do not forget to support your
                    exercise with nutritious meals and at least 2 liter's of
                    water every day.
                  </div>
                  <div className="pt-2">
                    <div className="h-4 w-4 inline-block bg-green-800 mr-1"></div>
                    Means you are doing great ! You increased your performance
                    according to last exercise. Keep up to good work and do not
                    forget to rest and eat well .
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExercisePage;
