import { useNavigate } from "react-router-dom";

const ToyItem = ({ data }) => {
  const navigate = useNavigate();
  const Viewhendler = (id) => {
    navigate(`/toy/${id}`);
  };
  return (
    <div className="w-full h-[470px] border p-2 rounded-md">
      <img
        src={data?.image}
        alt="Car"
        className="w-full h-[250px] rounded-md"
      />
      <div className="">
        <h3 className="text-lg md:text-xl font-bold font-head text-light my-3">
          {data?.name}
        </h3>
        <span className=" block">
          By: <strong>{data?.brand}</strong>
        </span>
        <span className=" block">
          Model: <strong>{data?.model}</strong>
        </span>
        <span className=" block">
          Price: <strong>{data?.price}</strong>
        </span>
      </div>
      <button
        className="btn mt-3 bg-primery text-dark font-bold border-none hover:bg-dark hover:text-light"
        onClick={() => {
          Viewhendler(data?._id);
        }}
      >
        Details
      </button>
    </div>
  );
};
export default ToyItem;
