import { actionType } from './action';

function categoriesReducer(categories = [], action = {}) {
  switch (action.type) {
    case actionType.RECEIVE_CATEGORIES:
      return action.payload.categories;
    case actionType.ADD_CATEGORY:
      return [...categories, action.payload.category];
    default:
      return categories;
  }
}

export default categoriesReducer;
