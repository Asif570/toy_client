import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../components/wrapper/Wrapper";
import ToyItem from "../components/toyItem/ToyItem";

const Search = () => {
  const location = useLocation();
  const query = location.search.split("=")[1];
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`${baseurl}/toySearch?name=${query}`)
      .then((res) => res.json().then((data) => setItems(data)))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Wrapper className={"mt-[120px]"}>
      <h3 className="text-center mb-10 text-light  font-head text-xl md:text-3xl">
        Search Result of :<strong> {query}</strong>
      </h3>
      <p className="mb-5">
        <strong>Total : </strong> {items.length}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items ? (
          items.map((item, i) => {
            return <ToyItem data={item} key={i} />;
          })
        ) : (
          <p>No Car Found !!</p>
        )}
      </div>
    </Wrapper>
  );
};
export default Search;
