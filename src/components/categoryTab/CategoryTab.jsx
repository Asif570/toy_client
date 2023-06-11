import { useContext, useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import { Context } from "../../layout/Layout";
import { useEffect } from "react";
import ToyItem from "../toyItem/ToyItem";
const CategoryTab = () => {
  const { Data } = useContext(Context);
  const [active, setActive] = useState("sports car");
  const [items, setItems] = useState(null);
  const activehundler = (name) => {
    setActive(name);
  };
  useEffect(() => {
    setItems(null);
    if (Data) {
      const D1 = Data.cars.filter((car) => car.catogery === active);
      setItems(D1);
    }
  }, [active, Data]);
  if (!Data) {
    return <progress className="progress mt-20 bg-light  w-[100%] "></progress>;
  }
  return (
    <Wrapper className={"my-20 "}>
      <h3 className="text-3xl text-center  md:text-5xl font-bold font-head text-light">
        Car By Category
      </h3>
      <div className="tabs tabs-boxed mt-10">
        {Data.category &&
          Object.keys(Data.category).map((item, i) => {
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
          items?.map((item, i) => {
            return <ToyItem data={item} key={i} />;
          })
        )}
      </div>
    </Wrapper>
  );
};
export default CategoryTab;
