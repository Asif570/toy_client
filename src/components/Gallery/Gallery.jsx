import { useEffect, useState } from "react";
import Wrapper from "../wrapper/Wrapper";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import axios from "axios";
// ..
const Gallery = () => {
  AOS.init();
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const [photos, setPhotos] = useState([]);
  const getRandomSize = () => {
    const sizes = ["h-48", "h-64", "h-96", "h-72", "h-56"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };
  useEffect(() => {
    axios.get(`${baseurl}/galleryPhotos`).then((data) => {
      const res = data.data.result;
      setPhotos(res);
    });
  }, []);
  return (
    <Wrapper className=" mx-auto py-20">
      <h3 className="text-center mb-10 text-3xl md:text-5xl text-light font-bold font-head">
        Our Gallery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className={`${getRandomSize()} } overflow-hidden  relative`}
          >
            <img
              data-aos="zoom-in-down"
              src={photo.url}
              alt={photo.caption}
              className="w-full h-[100%]"
            />
            <div className="bg-gray-900 text-white text-center py-2 absolute bottom-5 p-2 bg-dark/50">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
export default Gallery;
