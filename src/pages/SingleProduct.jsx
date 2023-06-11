import { useParams } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import { useState } from "react";
import { useEffect } from "react";
import ToyItem from "../components/toyItem/ToyItem";

const SingleProduct = () => {
  const [item, setItem] = useState(null);
  const [relaventitem, setRelaventItem] = useState(null);
  const { id } = useParams();
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;

  useEffect(() => {
    fetch(`${baseurl}/toy/${id}`)
      .then((res) =>
        res.json().then((data) => {
          setItem(data);
        })
      )
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    if (item) {
      fetch(`${baseurl}/toys?catogry = ${item.catogery}`)
        .then((res) =>
          res.json().then((data) => {
            setRelaventItem(data);
          })
        )
        .catch((err) => console.log(err));
    }
  }, [item]);
  return (
    <div>
      <Wrapper className={" mt-[120px]"}>
        {!item ? (
          <progress className="progress mt-20 bg-light  w-[100%] "></progress>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <img src={item?.image} alt="" className="h-[100%]" />
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-bold font-head text-light">
                {item?.name}
              </h3>
              <p>
                <strong>By : </strong>
                {item?.brand}
              </p>
              <p>
                <strong>Category : </strong>
                {item?.catogery}
              </p>
              <p>
                <strong>Color : </strong>
                {item?.color}
              </p>
              <p>
                <strong>Price : </strong>
                {item?.price}
              </p>
              <p>
                <strong>Seller : </strong>
                {item?.sellerName}
              </p>
              <p>
                <strong>In Stoke : </strong>
                {item?.inStoke}
              </p>
              <div>
                <strong className="block">Features : </strong>
                <ol type="i">
                  {item?.features.map((feature, i) => {
                    return <li key={i}>✔ {feature}</li>;
                  })}
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className=" my-16">
          <h3 className="text-lg md:text-xl font-bold text-light mb-5">
            Most relavent :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relaventitem ? (
              relaventitem.map((item) => {
                return <ToyItem data={item} key={item._id} />;
              })
            ) : (
              <h3>No Relavent Item Here</h3>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default SingleProduct;
