import "../App.css";
import { Link } from "react-router-dom";

function Card({ exercise }) {
  const id = exercise._id;
  return (
    <Link to={`/exercises/${id}`}>
      <div className="cart-bg text text-gray-300 mt-2 md:mt-1 rounded-lg p-5 col-span-1 transform transition ">
        <div className="flex justify-between">
          <p>{exercise.exerciseName}</p>
          <p>
            <span className="md:hidden lg:inline">last update </span>
            {exercise.time[exercise.time.length - 1]}
          </p>
        </div>
        <div className="text-gray-900 mt-5 py-5 rounded-lg bg-white w-3/4 mx-auto flex justify-center space-x-2">
          <p className="text-5xl">
            {exercise.improvement[exercise.improvement.length - 1]}
          </p>
          <p className="self-end">{exercise.exerciseType}'s</p>
        </div>

        <div className="mt-5 flex justify-end">
          <p>added by {exercise.author}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
