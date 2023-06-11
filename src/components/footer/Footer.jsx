import { Link } from "react-router-dom";
import Wrapper from "../wrapper/Wrapper";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter, BsFacebook } from "react-icons/bs";
const user = false;
const Footer = () => {
  return (
    <div className=" bg-primery text-light py-10 mt-20 ">
      <Wrapper
        className={
          "flex flex-col md:flex-row items-start justify-between gap-5"
        }
      >
        <div className="logo max-w-[350px]">
          <Link to={"/"} className="text-3xl md:text-5xl font-bold font-head">
            Toy Zone
          </Link>
          <p className=" mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            autem nulla harum architecto facilis rem vero, possimus provident
            beatae perferendis recusandae reiciendis voluptate aliquid?
          </p>
        </div>
        <div className=" h-full hidden md:block">
          <h3 className="font-bold my-5  text-dark">Connect with us</h3>
          <div className="mb-10 flex items-center gap-5 text-5xl">
            <FcGoogle className=" shadow-md rounded-full" />
            <BsFacebook className=" text-[#ffffff] shadow-md rounded-full" />
            <BsTwitter className=" text-[#ffffff] bg-primery rounded-full p-2 shadow-md" />
          </div>
          <span className=" mt-[30px] block">
            &copy; All Right are Resurved By{" "}
            <Link className={"underline"} to={"/"}>
              Toy Zone
            </Link>
          </span>
        </div>
        <div className="contact w-full max-w-[400px]">
          <form action="" className="w-full flex flex-col gap-5">
            <div className=" flex flex-col gap-2 w-full">
              <label htmlFor="email" className=" text-dark">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="h-[40px] rounded-md bg-light outline-none border-none px-2 text-dark"
                placeholder="Email"
              />
            </div>
            <div className=" flex flex-col gap-2 w-full">
              <label htmlFor="message" className=" text-dark">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className=" rounded-md bg-light outline-none border-none px-2 text-dark"
                placeholder="Message"
              ></textarea>
            </div>
            <button className="btn bg-light border-none text-dark font-bold hover:text-[#ffffff]">
              send
            </button>
          </form>
        </div>
        <div className=" h-full md:hidden ">
          <h3 className="font-bold my-5  text-dark">Connect with us</h3>
          <div className="mb-10 flex items-center justify-center gap-5 text-5xl">
            <FcGoogle className=" shadow-md rounded-full" />
            <BsFacebook className=" text-[#ffffff] shadow-md rounded-full" />
            <BsTwitter className=" text-[#ffffff] bg-primery rounded-full p-2 shadow-md" />
          </div>
          <span className=" mt-[30px] block text-center">
            &copy; All Right are Resurved By{" "}
            <Link className={"underline"} to={"/"}>
              Toy Zone
            </Link>
          </span>
        </div>
      </Wrapper>
    </div>
  );
};
export default Footer;
