import { useContext, useEffect } from "react";
import Wrapper from "../wrapper/Wrapper";
import { useState } from "react";
import pagecount from "../../util/paginationPageCount";
import ToyItem from "../toyItem/ToyItem";
import { Context } from "../../layout/Layout";
import axios from "axios";
const OurToys = () => {
  const bassurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [totalItem, setTotalItem] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentpage, setCurrentpage] = useState(0);
  const limit = import.meta.env.VITE_ITEM_LIMIT_PER_PAGE;

  useEffect(() => {
    axios
      .get(`${bassurl}/toycount`)
      .then((data) => {
        const res = data.data.result;
        setTotalItem(res);
        setTotalPage(pagecount(res));
      })

      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    axios
      .get(`${bassurl}/toys?limit=${limit}&skip=${currentpage * limit}`)
      .then((data) => {
        const res = data.data.result;
        setItems(res);
      })
      .catch((err) => console.error(err));
  }, [currentpage]);

  const currentpagehundle = (i) => {
    setCurrentpage(i);
  };
  return (
    <>
      <Wrapper>
        <h3 className="text-3xl md:text-5xl font-bold text-center font-head text-light my-20">
          Our Cars
        </h3>

        <span className="mb-3 block capitalize text-light">
          <strong> total Items</strong> : {totalItem}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {items ? (
            items.map((item, i) => {
              return <ToyItem data={item} key={i}></ToyItem>;
            })
          ) : (
            <progress className="progress mt-20 bg-light  w-[100%] "></progress>
          )}
        </div>
        <div className="btn-group justify-center w-full mt-20">
          {Array.from({ length: totalPage }, (data, index) => {
            return index + 1;
          }).map((i) => (
            <button
              className={currentpage == i - 1 ? "btn btn-active" : "btn"}
              onClick={() => {
                currentpagehundle(i - 1);
              }}
              key={i}
            >
              {i}
            </button>
          ))}
        </div>
      </Wrapper>
    </>
  );
};
export default OurToys;
