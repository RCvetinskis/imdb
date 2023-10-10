const itemsPerPage = 6;

const paginationCounter = (data, itemOffset) => {
  const endOffset = itemOffset + itemsPerPage;
  const counterObject = {
    currentItems: data.slice(itemOffset, endOffset),
    pageCount: Math.ceil(data.length / itemsPerPage),
    itemsPerPage: 5,
  };
  return counterObject;
};

export default paginationCounter;
