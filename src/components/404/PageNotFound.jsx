import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="relative ">
      <img
        src="https://static.vecteezy.com/system/resources/previews/006/549/647/original/404-landing-page-free-vector.jpg"
        className=" w-[100vw] relative  h-[100vh]"
        alt=""
      />
      <Link
        to={"/"}
        className=" absolute top-[50%] left-[0] text-2xl text-light cursor-pointer text-bold underline bg-dark/40 py-2 w-full text-center"
      >
        Go To Home
      </Link>
    </div>
  );
};
export default PageNotFound;
