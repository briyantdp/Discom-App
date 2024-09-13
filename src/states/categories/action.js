const actionType = {
  RECEIVE_CATEGORIES: 'categories/receive',
  ADD_CATEGORY: 'categories/add',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: actionType.RECEIVE_CATEGORIES,
    payload: {
      categories,
    },
  };
}

function addCategoryActionCreator(category) {
  return {
    type: actionType.ADD_CATEGORY,
    payload: {
      category,
    },
  };
}

export { actionType, receiveCategoriesActionCreator, addCategoryActionCreator };
