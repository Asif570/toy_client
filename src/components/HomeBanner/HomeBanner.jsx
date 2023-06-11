import Wrapper from "../wrapper/Wrapper";

const HomeBanner = () => {
  return (
    <div>
      <Wrapper className={"mt-[90px]"}>
        <div className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box">
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1587839871379-2d6c28071f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=918&q=80"
              className="rounded-box max-w-[600px] h-[500px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1532330393533-443990a51d10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              className="rounded-box max-w-[600px] h-[500px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://5.imimg.com/data5/SELLER/Default/2021/12/GF/JI/DZ/102064656/patoys-baby-car-toy-vehicle-4x4-rechargeable-battery-operated-ig-kids-car-1000x1000.jpg"
              className="rounded-box max-w-[600px] h-[500px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i5.walmartimages.com/asr/f173cf37-821d-4fd9-b914-d81104ad67cc.a766e1ac142a54528a70994a5e5ab67d.jpeg"
              className="rounded-box max-w-[600px] h-[500px]"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://hips.hearstapps.com/popularmechanics/assets/16/23/1465411956-gettyimages-465749919.jpg"
              className="rounded-box max-w-[600px] h-[500px]"
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default HomeBanner;
