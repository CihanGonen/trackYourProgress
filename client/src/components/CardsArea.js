import Card from "./Card";
import useAxios from "./useAxios";

function CardsArea() {
  const { data: exercises, isPending, error } = useAxios("getAll");

  return (
    <div className="col-span-4 mt-5 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-2">
      {error && <div className="col-span-2 mx-auto text-4xl">{error}</div>}
      {isPending && <div>Loading...</div>}
      {exercises.map((exercise) => {
        return <Card exercise={exercise} key={exercise._id} />;
      })}
    </div>
  );
}

export default CardsArea;
