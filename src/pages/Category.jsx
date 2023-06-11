import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Context } from "../layout/Layout";
import Wrapper from "../components/wrapper/Wrapper";
import pagecount from "../util/paginationPageCount";
import ToyItem from "../components/toyItem/ToyItem";

const Category = () => {
  const { category } = useParams();
  const { categores = {} } = useContext(Context);
  const bassurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [totalItem, setTotalItem] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentpage, setCurrentpage] = useState(0);
  const [color, setColor] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  let it;
  if (categores) {
    it = categores[category];
  }

  const limit = import.meta.env.VITE_ITEM_LIMIT_PER_PAGE;

  useEffect(() => {
    setTotalItem(it);
    setTotalPage(pagecount(it));
  }, [it]);
  useEffect(() => {
    fetch(
      `${bassurl}/toys?limit=${limit}&skip=${
        currentpage * limit
      }&catogery=${category}&color=${color}&min=${min}&max=${max}`
    )
      .then((res) =>
        res.json().then((data) => {
          setItems(data);
        })
      )
      .catch((err) => console.error(err));
  }, [currentpage, category, color, min, max]);
  const colorhundler = (e) => {
    setColor(e.target.value);
  };
  const minPricehundler = (e) => {
    setMin(e.target.value);
  };
  const maxPricehundler = (e) => {
    setMax(e.target.value);
  };
  const currentpagehundle = (i) => {
    setCurrentpage(i);
  };
  if (!it) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }

  return (
    <>
      <Wrapper className={"mt-[120px]"}>
        <h3 className="text-3xl md:text-5xl font-bold text-center font-head text-light my-20">
          Our {category} Cars
        </h3>
        <span className="mb-3 block capitalize text-light">
          <strong> total Items by Category</strong> : {totalItem}
        </span>
        <span className="mb-3 block capitalize text-light">
          <strong> Filter by Color : </strong>
          <select name="color" id="" defaultValue={" "} onChange={colorhundler}>
            <option value="">All</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="green">Green</option>
            <option value="yello">Yello</option>
            <option value="mix">Mix</option>
          </select>
        </span>
        <span className="mb-3 block capitalize text-light">
          <strong> Filter by price : </strong>

          <input type="text" placeholder="Min" onChange={minPricehundler} />
          <input type="text" placeholder="Max " onChange={maxPricehundler} />
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {items.map((item, i) => {
            return <ToyItem data={item} key={i}></ToyItem>;
          })}
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
export default Category;
