const Wrapper = ({ className, children }) => {
  return (
    <div
      className={`w-full xl:max-w-[1400px]  lg:max-w-[1100px]  md:max-w-[800px] px-[20px] ${className}`}
    >
      {children}
    </div>
  );
};
export default Wrapper;
