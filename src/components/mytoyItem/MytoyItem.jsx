import { BiPencil } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
const MytoyItem = ({ data, editHundler, deleteHundler }) => {
  return (
    <div className="border rounded-md h-[80px] md:h-[120px] w-full flex items-center p-2">
      <div className="img h-full">
        <img
          src={data.image}
          alt="Image"
          className=" h-full w-[100px] md:w-[160px]"
        />
      </div>
      <div className="ml-5">
        <Link to={`/toy/${data._id}`}>
          <h3 className="text-sm md:text-xl text-light font-bold font-head">
            {data.name}
          </h3>
        </Link>
        <span className="hidden md:block">Model :{data.model} </span>
        <span className="hidden md:block">Brand: {data.brand} </span>
      </div>
      <div className="ml-auto flex ">
        <BiPencil
          className="cursor-pointer mx-5"
          onClick={() => {
            editHundler(data._id);
          }}
        />

        <ImBin
          className=" cursor-pointer  text-red/90 hover:text-light"
          onClick={() => {
            deleteHundler(data._id);
          }}
        />
      </div>
    </div>
  );
};
export default MytoyItem;
