import { Link, NavLink } from "react-router-dom";
import Wrapper from "../wrapper/Wrapper";
import { useContext, useState } from "react";
import { Context } from "../../layout/Layout";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [expend, setExpend] = useState(false);
  const { user, Data } = useContext(Context);

  const logOutHundler = () => {
    signOut(auth);
    expendhundler();
  };
  const expendhundler = () => {
    setExpend(!expend);
  };
  return (
    <div className=" bg-primery w-full h-[75px] mb-10 fixed top-0 z-[100] shadow-lg ">
      <Wrapper className={"flex items-center justify-between h-full "}>
        {/* logo Section start  */}
        <div className="logo">
          <Link to={"/"}>
            <h3 className="font-bold  font-head text-3xl md:text-5xl text-light ">
              Toy Zone
            </h3>
          </Link>
        </div>
        {/* logo Section end */}
        {/* nav start  */}
        <div className="nav hidden md:block">
          <ul className="flex items-start gap-10 font-bold text-lg text-light">
            <li onClick={expendhundler}>
              <NavLink exact="true" to="/">
                Home
              </NavLink>
            </li>
            <li className="relative group " onClick={expendhundler}>
              <NavLink to="#">Category</NavLink>
              <ul className="bg-primery  w-[150px] absolute hidden group-hover:flex z-[100]  flex-col gap-1">
                {Data
                  ? Object.keys(Data.category).map((name, i) => {
                      return (
                        <li
                          key={i}
                          className=" hover:bg-dark/10 p-2 "
                          onClick={expendhundler}
                        >
                          <Link to={`/toys/${name}`}>
                            {name} &nbsp;
                            {Data.category[name]}
                          </Link>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </li>
            <li onClick={expendhundler}>
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
            <li onClick={expendhundler}>
              <NavLink to={"/alltoys"}>Toys</NavLink>
            </li>
            {user && (
              <>
                <li onClick={expendhundler}>
                  <NavLink to={"/mytoys"}>My Toys</NavLink>
                </li>

                <li onClick={expendhundler}>
                  <NavLink to={"/addcar"}>Add Car</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* nav end */}
        {/* user start  */}
        <div className="user hidden md:block">
          {user ? (
            <div className="flex items-center gap-5">
              <div
                className="hover:tooltip hover:tooltip-open hover:tooltip-bottom"
                data-tip={user.displayName ? user.displayName : "User"}
              >
                <div className="avatar cursor-pointer">
                  <div className="w-[50px] h-[50px] rounded-full  overflow-clip ">
                    <img
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
                      }
                    />
                  </div>
                </div>
              </div>
              <Link
                className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl"
                to={"/"}
                onClick={logOutHundler}
              >
                Log Out
              </Link>
            </div>
          ) : (
            <>
              <Link
                className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl"
                to={"/user/login"}
              >
                Login
              </Link>
              <Link
                className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl ml-5"
                to={"/user/register"}
              >
                Register
              </Link>
            </>
          )}
        </div>
        <FaBars
          onClick={expendhundler}
          className={
            expend
              ? " rotate-90 block md:hidden text-xl text-dark"
              : "block md:hidden text-xl text-dark"
          }
        />
        {/* user end */}
        {/* mobile nav  */}

        <div
          className={
            expend
              ? "top-[75px] right-0 h-[100%] w-full  bg-primery fixed  z-[999] md:hidden transition-all duration-500 ]"
              : "h-[100%] w-full  bg-primery fixed  z-[999] md:hidden  -top-4  -right-[calc(100vw+10px)] transition-all duration-500 ]"
          }
        >
          <ul className="flex flex-col mt-10  items-center gap-10 font-bold text-lg text-light">
            <li
              onClick={expendhundler}
              className="bg-light/50 w-full text-center py-2"
            >
              <NavLink exact="true" to="/">
                Home
              </NavLink>
            </li>
            <li
              onClick={expendhundler}
              className="relative group bg-light/50 w-full text-center py-1"
            >
              <NavLink to="#">Category</NavLink>
              <ul className="bg-primery  w-[150px] absolute hidden group-hover:flex z-50  flex-col gap-1">
                {Data
                  ? Object.keys(Data.category)?.map((name, i) => {
                      return (
                        <li key={i} className=" hover:bg-dark/10 p-2 ">
                          <Link to={`/toys/${name}`}>
                            {name} = {Data.category[name]}
                          </Link>
                        </li>
                      );
                    })
                  : ""}
              </ul>
            </li>
            <li
              onClick={expendhundler}
              className="bg-light/50 w-full text-center py-1"
            >
              <NavLink to={"/blogs"}>Blogs</NavLink>
            </li>
            <li
              onClick={expendhundler}
              className="bg-light/50 w-full text-center py-1"
            >
              <NavLink to={"/alltoys"}>Toys</NavLink>
            </li>
            {user ? (
              <>
                <li
                  onClick={expendhundler}
                  className="bg-light/50 w-full text-center py-1"
                >
                  <NavLink to={"/mytoys"}>My Toys</NavLink>
                </li>
                <li
                  onClick={expendhundler}
                  className="bg-light/50 w-full text-center py-1"
                >
                  <NavLink to={"/addcar"}>Add Car</NavLink>
                </li>
                <div
                  className="hover:tooltip hover:tooltip-open hover:tooltip-bottom"
                  data-tip={user.displayName ? user.displayName : "User"}
                >
                  <div className="avatar cursor-pointer">
                    <div className="w-[50px] h-[50px] rounded-full  overflow-clip ">
                      <img
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
                        }
                      />
                    </div>
                  </div>
                  <p className="md:headdin">{user.displayName}</p>
                </div>
                <Link
                  className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl"
                  to={"/"}
                  onClick={logOutHundler}
                >
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl"
                  to={"/user/login"}
                >
                  Login
                </Link>
                <Link
                  className="btn bg-light font-bold text-[#242222] border-none hover:text-[#fff] py-[5px] px-5 rounded-md shadow-xl ml-5"
                  to={"/user/register"}
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};
export default Header;
