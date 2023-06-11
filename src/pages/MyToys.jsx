import { useContext, useEffect, useState } from "react";

import { Context } from "../layout/Layout";
import Wrapper from "../components/wrapper/Wrapper";
import MytoyItem from "../components/mytoyItem/MytoyItem";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const MyToys = () => {
  const { user, loadding, Data } = useContext(Context);
  const [items, setItems] = useState(null);
  const [reload, setRealod] = useState(null);
  const location = useLocation();
  const nevigator = useNavigate();
  const editHundler = (id) => {
    nevigator(`/mytoy/edit/${id}`, { state: location.pathname });
  };
  const deleteHundler = (id) => {
    fetch(`${baseurl}/toy/${id}`, {
      method: "DELETE",
    })
      .then((res) =>
        res.json().then((data) => {
          swal("Delete Success", "", "success");
          setRealod(!reload);
        })
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (Data) {
      const data1 = Data.cars.filter((item) => item.email === user.email);
      setItems(data1);
    }
  }, [reload, Data]);
  if (loadding) {
    <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
    return;
  }
  return (
    <Wrapper className={"mt-[120px]"}>
      <h3 className="mb-16 text-center text-3xl md:text-5xl text-light font-bold font-head">
        My Toys
      </h3>

      <div className="flex flex-col gap-5">
        {items ? (
          items.map((item, i) => {
            return (
              <MytoyItem
                key={i}
                data={item}
                editHundler={editHundler}
                deleteHundler={deleteHundler}
              />
            );
          })
        ) : (
          <h3>No Item Here</h3>
        )}
      </div>
    </Wrapper>
  );
};
export default MyToys;
