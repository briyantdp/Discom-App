const actionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
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
