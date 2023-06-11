import { useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import swal from "sweetalert";
const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
const AddCatogery = () => {
  const [inputeddata, setInputeddata] = useState(" ");
  const inputhundler = (e) => {
    const { name, value } = e.target;
    setInputeddata({ name: value });
  };
  console.log(inputeddata);
  const formhundler = (e) => {
    e.preventDefault();
    if (!inputeddata) return;
    fetch(`${baseurl}/addcatogery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputeddata),
    })
      .then((res) => {
        swal("Added", "New Category Added", "success");
        e.target.reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <div className="max-w-[600px] mx-auto">
        <h3 className="text-3xl md:text-5xl text-center text-light font-bold font-head ">
          Add A New Category
        </h3>

        <form onSubmit={formhundler} className="flex flex-col my-20">
          <label htmlFor="name" className=" font-bold text-light mb-2">
            Category
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={inputhundler}
            placeholder="Enter a Category name"
            className=" w-full bg-light px-3 py-2 rounded-md outline-none border-none text-dark"
          />
          <button
            type="submit"
            className=" btn hover:bg-light hover:text-dark border-none outline-none text-white font-bold  w-full mt-3"
          >
            Add
          </button>
        </form>
      </div>
    </Wrapper>
  );
};
export default AddCatogery;
