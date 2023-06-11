import { useContext, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../layout/Layout";
import axios from "axios";
const Register = () => {
  const { user, loadding } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.pathname || "/";
  const [error, setError] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [inputedData, setInputedData] = useState({});
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const onChangeHundler = (e) => {
    const { name, value } = e.target;
    setError("");
    setInputedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const formSubmithundler = (e) => {
    e.preventDefault();
    const { email, password, Cpassword, name, photoURL = "" } = inputedData;
    if (!email) return;
    if (!password) return;
    if (password !== Cpassword) {
      setError(" password not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then((res) => {
            axios
              .get(`${baseurl}/adduser`, {
                headers: {
                  auth: email,
                  userName: name,
                },
              })
              .then((res) => {
                console.log(res.token);
                localStorage.setItem("jwtToken", res.data.token);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.log(err));
      })

      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });

    e.target.reset();
    swal("Register Success", "", "success");
    navigate(from, {
      replace: true,
    });
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
          .then((res) => {
            localStorage.setItem("jwtToken", res.data.token);
          })
          .catch((err) => console.error(err));
      })
      .then(() => {
        swal("Register Success", "", "success");
        navigate(from, {
          replace: true,
        });
      })
      .catch((err) => console.log(err));
  };
  if (loadding) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }
  if (user) {
    return navigate("/", {
      replace: true,
    });
  }
  return (
    <div>
      <Wrapper className={"my-20 mt-[120px] "}>
        <h3 className="text-center text-bold font-head text-5xl text-light mb-10">
          Register Now !!
        </h3>
        <div className=" w-full">
          <form
            onSubmit={formSubmithundler}
            className=" w-full mx-auto max-w-[600px]"
          >
            {error ? (
              <div className="border border-red/70 bg-red/10  text-center text-red/70 py-2 mb-10 rounded-md">
                {error}
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
            <div className=" w-full mb-5">
              <label htmlFor="name">Name</label>
              <input
                onChange={onChangeHundler}
                type="text"
                name="name"
                required
                id="name"
                className=" w-full bg-light px-3 py-2 rounded-md outline-none border-none text-dark"
                placeholder="Enter Your Name"
              />
            </div>
            <div className=" w-full mb-5 relative">
              <p className=" absolute top-0 right-5 cursor-pointer text-sm">
                Optional
              </p>
              <label htmlFor="photoURL">PhotoURL</label>
              <input
                onChange={onChangeHundler}
                type="text"
                name="photoURL"
                id="photoURL"
                className=" w-full bg-light px-3 py-2 rounded-md outline-none border-none text-dark"
                placeholder="Enter Your photoURL"
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
              <label htmlFor="Cpassword">Confrim Password</label>
              <input
                type={showpass ? "text" : "password"}
                name="Cpassword"
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
                Register
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
export default Register;
