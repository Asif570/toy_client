import { useContext, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { Context } from "../layout/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
const EditProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigator = useNavigate();
  const form = location?.state || "/";
  const [inputedData, setInputedData] = useState();

  const onSubmithundler = (e) => {
    e.preventDefault();

    fetch(`${baseurl}/toy/${id}`, {
      method: "PATCH",
      body: JSON.stringify(inputedData),
      headers: {
        token: localStorage.getItem("jwtToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) =>
        res.json().then((data) => {
          swal("Update Successfull", "", "success");
          navigator(form, { replace: true });
        })
      )
      .catch((err) => console.log(err));
  };
  const onChangegInpute = (e) => {
    const { name, value } = e.target;
    setInputedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [olddata, setOldedata] = useState();
  const { categores, setReload, reload, user } = useContext(Context);
  useEffect(() => {
    fetch(`${baseurl}/toy/${id}`)
      .then((res) =>
        res.json().then((data) => {
          setOldedata(data);
        })
      )
      .catch((err) => console.log(err));
  }, []);
  return (
    <Wrapper className={"my-20 md:mt-0 mt-[120px]"}>
      <h3 className="text-center text-light text-3xl md:text-5xl font-bold font-head">
        Update Your Car
      </h3>
      <form
        onSubmit={onSubmithundler}
        className="flex flex-col gap-4 md:w-[600px] w-[90%] mx-auto mt-10"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="name" className=" text-lg text-light font-bold">
            Name
          </label>
          <input
            onChange={onChangegInpute}
            type="text"
            placeholder="Name"
            name="name"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            defaultValue={olddata?.name}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="brand" className=" text-lg text-light font-bold">
            Brand
          </label>
          <input
            onChange={onChangegInpute}
            type="text"
            placeholder="Brand"
            name="brand"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            defaultValue={olddata?.brand}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="model" className=" text-lg text-light font-bold">
            Model
          </label>
          <input
            onChange={onChangegInpute}
            type="text"
            placeholder="Model"
            name="model"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            defaultValue={olddata?.model}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="color" className=" text-lg text-light font-bold">
            Color
          </label>
          <input
            onChange={onChangegInpute}
            type="text"
            placeholder="Color"
            name="color"
            defaultValue={olddata?.color}
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="price" className=" text-lg text-light font-bold">
            Price
          </label>
          <input
            onChange={onChangegInpute}
            type="number"
            placeholder="Price $"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            name="price"
            defaultValue={olddata?.price}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="inStoke" className=" text-lg text-light font-bold">
            In Stoke
          </label>
          <input
            onChange={onChangegInpute}
            type="number"
            placeholder="10"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            name="inStoke"
            defaultValue={olddata?.inStoke}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="image" className=" text-lg text-light font-bold">
            Image
          </label>
          <input
            onChange={onChangegInpute}
            type="text"
            placeholder="image"
            name="image"
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
            defaultValue={olddata?.image}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="catogery" className=" text-lg text-light font-bold">
            Category
          </label>
          <select
            onChange={onChangegInpute}
            name="catogery"
            id=""
            required
            defaultValue={"Select"}
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
          >
            {categores &&
              Object.keys(categores).map((item, i) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="features" className=" text-lg text-light font-bold">
            Features
          </label>
          <textarea
            type="text"
            onChange={onChangegInpute}
            placeholder="use // to make a new point"
            name="features"
            defaultValue={olddata?.features}
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
          ></textarea>
        </div>
        <button
          type="submit"
          className=" p-2 rounded-md outline-none border-none hover:bg-light hover:text-dark bg-dark text-light font-bold w-full"
        >
          Update
        </button>
      </form>
    </Wrapper>
  );
};
export default EditProduct;
