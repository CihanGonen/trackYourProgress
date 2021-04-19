import * as d3 from "d3";
import "../App.css";

import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function HandleQuery({ operation }) {
  let query = useQuery();
  let history = useHistory();

  const removeDelete = () => {
    setTimeout(function () {
      d3.select(".query-text-delete").remove();
    }, 2000);
  };

  const removeInsert = () => {
    setTimeout(function () {
      d3.select(".query-text-insert").remove();
    }, 2000);
  };

  const handleQuery = (operation) => {
    let exerciseName = operation.split(",")[1];
    if (operation.includes("delete")) {
      const page = (
        <p className="text-gray-200 query-text-delete bg-red-700 p-1 mt-1 rounded-lg text-center">
          The {exerciseName} exercise deleted succesfully
        </p>
      );
      removeDelete();
      return page;
    }
    if (operation.includes("insert")) {
      let exerciseName = operation.split(",")[1];
      const page = (
        <p className="text-gray-200 query-text-insert bg-green-700 p-1 mt-1 rounded-lg text-center">
          The {exerciseName} exercise inserted succesfully
        </p>
      );
      removeInsert();
      return page;
    }
  };

  return <div>{operation ? handleQuery(operation) : <p></p>}</div>;
}

export default HandleQuery;
