import { useContext, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import { Context } from "../../layout/Layout";
import { useEffect } from "react";
import ToyItem from "../toyItem/ToyItem";
import axios from "axios";
const CategoryTab = () => {
  const bassurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [categores, setCategores] = useState([]);
  useEffect(() => {
    axios.get(`${bassurl}/catogery`).then((data) => {
      const res = data.data.result;
      setCategores(res);
    });
  }, []);
  const [active, setActive] = useState("sports car");
  const [items, setItems] = useState(null);
  const activehundler = (name) => {
    setActive(name);
  };
  useEffect(() => {
    setItems(null);
    axios
      .get(`${bassurl}/toys?limit=${99}&catogery=${active}`)
      .then((data) => {
        const res = data.data.result;
        setItems(res);
      })
      .catch((err) => console.error(err));
  }, [active]);
  if (!categores) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }
  return (
    <Wrapper className={"my-20 "}>
      <h3 className="text-3xl text-center  md:text-5xl font-bold font-head text-light">
        Car By Category
      </h3>
      <div className="tabs tabs-boxed mt-10">
        {Object.keys(categores).map((item, i) => {
          return (
            <a
              className={active === item ? "tab tab-active" : "tab"}
              key={i}
              onClick={() => {
                activehundler(item);
              }}
            >
              {item}
            </a>
          );
        })}
      </div>
      <div className="itemsContainer mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {!items ? (
          <progress className="progress mt-20 bg-light  w-[100%] "></progress>
        ) : (
          items.map((item, i) => {
            return <ToyItem data={item} key={i} />;
          })
        )}
      </div>
    </Wrapper>
  );
};
export default CategoryTab;
