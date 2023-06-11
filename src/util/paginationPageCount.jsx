const pagecount = (totalItem) => {
  let pages = Math.ceil(totalItem / import.meta.env.VITE_ITEM_LIMIT_PER_PAGE);
  return pages;
};
export default pagecount;
