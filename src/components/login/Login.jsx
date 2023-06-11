import Wrapper from "../wrapper/Wrapper";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../layout/Layout";
import axios from "axios";
const Login = () => {
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(Context);
  const from = location?.state?.pathname || "/";
  // show password
  const [showpass, setShowpass] = useState(false);
  const [error, setError] = useState("");
  const [inputedData, setInputedData] = useState({});

  const onChangeHundler = (e) => {
    const { name, value } = e.target;
    setInputedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmithundler = (e) => {
    e.preventDefault();
    const { email, password } = inputedData;
    if (!email) return;
    if (!password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        axios
          .get(`${baseurl}/adduser`, {
            headers: {
              auth: email,
              userName: res.user.displayName,
            },
          })
          .then((res) => localStorage.setItem("jwtToken", res.data.token))
          .catch((err) => console.error(err));
      })
      .then(() => {
        swal("Login Success", "", "succeess");
        navigate(from, {
          replace: true,
        });
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });

    e.target.reset();
  };

  const googleLoginHundler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        axios
          .get(`${baseurl}/adduser`, {
            headers: {
              auth: res.user.email,
              userName: res.user.displayName,
            },
          })
          .then((res) => localStorage.setItem("jwtToken", res.data.token))
          .catch((err) => console.error(err));
      })
      .then(() => {
        swal("Login Success", "", "success");
        navigate(from, {
          replace: true,
        });
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };
  const nevigate = useNavigate();
  if (user) {
    nevigate("/", { replace: true });
    return;
  }
  return (
    <div>
      <Wrapper className={"my-20  mt-[120px]"}>
        <h3 className="text-center text-bold font-head text-5xl text-light mb-10">
          Login Now !!
        </h3>
        <div className=" w-full">
          <form
            onSubmit={formSubmithundler}
            className=" w-full mx-auto max-w-[600px]"
          >
            {error ? (
              <div className="border border-red/70 bg-red/10  text-center text-red/70 py-2 mb-10 rounded-md">
                error
              </div>
            ) : (
              <></>
            )}
            <div className=" w-full mb-5">
              <label htmlFor="email">Email</label>
              <input
                onChange={onChangeHundler}
                type="text"
                name="email"
                required
                id="email"
                className=" w-full bg-light px-3 py-2 rounded-md outline-none border-none text-dark"
                placeholder="Enter Your Email"
              />
            </div>
            <div className=" w-full relative">
              {showpass ? (
                <AiFillEyeInvisible
                  className=" absolute top-0 right-5 cursor-pointer text-xl"
                  onClick={() => {
                    setShowpass(false);
                  }}
                />
              ) : (
                <AiFillEye
                  className=" absolute top-0 right-5 cursor-pointer text-xl"
                  onClick={() => {
                    setShowpass(true);
                  }}
                />
              )}
              <label htmlFor="password">Password</label>
              <input
                type={showpass ? "text" : "password"}
                name="password"
                required
                security="true"
                onChange={onChangeHundler}
                className="w-full bg-light px-3 py-2 rounded-md outline-none border-none text-dark mb-10"
                placeholder="Enter Your Password"
                id="password"
              />
            </div>
            <div className=" w-full text-center">
              <button
                type="submit"
                className=" btn hover:bg-light hover:text-dark border-none outline-none text-white font-bold  w-full"
              >
                Login
              </button>
            </div>
          </form>
          <h3 className="font-head text-3xl text-white text-center my-5">or</h3>
          <div className=" mt-10 flex  gap-16  justify-between w-full mx-auto max-w-[400px] ">
            <FcGoogle
              className=" cursor-pointer
             w-[50px]  text-5xl shadow-xl rounded-full"
              onClick={googleLoginHundler}
            />
            <BsFacebook
              className=" cursor-pointer 
             w-[50px] text-5xl text-primery shadow-xl rounded-full "
            />
            <BsGithub
              className="cursor-pointer 
             w-[50px] text-5xl text-dark shadow-xl rounded-full "
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default Login;
