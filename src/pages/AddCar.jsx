import { useContext, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { Context } from "../layout/Layout";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const AddCar = () => {
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;

  const { Data, user } = useContext(Context);

  const [inputedData, setInputedData] = useState({});
  const onChangegInpute = (e) => {
    const { name, value } = e.target;
    setInputedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigator = useNavigate();
  const onSubmithundler = (e) => {
    let { displayName, email, photoURL } = user;
    let sellerImage = photoURL;
    let sellerName = displayName;
    e.preventDefault();
    let {
      name,
      brand,
      price,
      color,
      features,
      catogery,
      model,
      image,
      inStoke = 1,
    } = inputedData;

    features = features.split("//");

    fetch(`${baseurl}/addtoy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        brand,
        price,
        color,
        model,
        features,
        catogery,
        image,
        inStoke,
        sellerName,
        email,
        sellerImage,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          swal("Item Add", "", "success");
        });
      })
      .catch((err) => console.log(err));
    e.target.reset();
    navigator("/", { replace: true });
  };

  return (
    <Wrapper className={"my-20 mt-[120px] "}>
      <h3 className="text-center text-light text-3xl md:text-5xl font-bold font-head">
        Add a Car
      </h3>
      <form
        onSubmit={onSubmithundler}
        className="flex flex-col gap-4 md:w-[600px] w-[90%]  mx-auto mt-10  overflow-clip"
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
            required
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
            required
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
            required
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
            defaultValue={"mix"}
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
            required
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
            required
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
            required
          />
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="catogery" className=" text-lg text-light font-bold">
            Category
          </label>
          <select
            onChange={onChangegInpute}
            name="catogery"
            id=""
            required
            defaultValue={"Select"}
            className=" p-2 rounded-md outline-none border-none bg-light text-dark w-full overflow-hidden"
          >
            {Data &&
              Object.keys(Data.category).map((item, i) => {
                return (
                  <option
                    value={item}
                    key={i}
                    className="
                "
                  >
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
            defaultValue={" "}
            className=" p-2 rounded-md outline-none border-none bg-light text-dark"
          ></textarea>
        </div>
        <button
          type="submit"
          className=" p-2 rounded-md outline-none border-none hover:bg-light hover:text-dark bg-dark text-light font-bold w-full"
        >
          Add
        </button>
      </form>
    </Wrapper>
  );
};
export default AddCar;
