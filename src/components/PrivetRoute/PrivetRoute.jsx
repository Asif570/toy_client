import { useContext } from "react";
import { Context } from "../../layout/Layout";
import { Navigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

const PrivetRoute = ({ children }) => {
  const { user, loadding } = useContext(Context);
  let location = useLocation();
  if (loadding) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }
  if (user) {
    return children;
  }
  swal("Please login Frist", "", "warning");
  return <Navigate to={"/user/login"} replace={true} state={location} />;
};
export default PrivetRoute;
