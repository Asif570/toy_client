import { useContext, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import ToyItem from "../components/toyItem/ToyItem";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Context } from "../layout/Layout";
const Alltoys = () => {
  const [items, setItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [searchQuery, setSerchQuery] = useState(null);
  const { Data } = useContext(Context);
  useEffect(() => {
    if (Data) {
      setItems(Data.cars);
      setSellers(Data.users);
    }
  }, [Data]);
  const navigate = useNavigate();
  const onChangeHundler = (e) => {
    const { name, value } = e.target;
    setSerchQuery({ [name]: value });
  };
  const OnSearchHundler = () => {
    if (!searchQuery?.search) {
      swal("Please Enter Some thing ...", "", "error");
      return;
    }
    navigate(`/toys/search?search=${searchQuery.search}`);
  };
  if (!items) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }
  return (
    <Wrapper className="my-10 mt-[120px]">
      <h3 className="text-light md:text-5xl font-bold fond-head text-center mb-16">
        Our Toys
      </h3>
      <div className="w-full h-[50px] mt-20 mb-10 flex items-center border rounded-lg bg-light/20">
        <input
          type="text"
          name="search"
          onChange={onChangeHundler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              OnSearchHundler();
            }
          }}
          className="h-full w-full bg-transparent border-none outline-none px-3 py-2 text-light"
        />
        <AiOutlineSearch
          className="text-2xl text-light mr-5 cursor-pointer"
          onClick={OnSearchHundler}
        />
      </div>
      <div className="flex flex-col gap-16 ">
        {sellers &&
          sellers?.map((seller, i) => {
            const itemsbyseller = items.filter(
              (item) => item.sellerName === seller.userName
            );
            if (itemsbyseller.length < 1) {
              return;
            }
            return (
              <div key={i} className="flex flex-col gap-5">
                <h3 className="text-light font-bold font-head text-xl md:text-2xl uppercase">
                  Seller : {seller.userName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {itemsbyseller &&
                    itemsbyseller?.map((val, i) => {
                      return <ToyItem key={i} data={val} />;
                    })}
                </div>
                <hr />
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};
export default Alltoys;
