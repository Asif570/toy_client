const pagecount = (totalItem) => {
  let pages = Math.ceil(totalItem / 6);
  return pages;
};
export default pagecount;
