/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';

import { Button } from '@material-tailwind/react';

export default function CategoryItem({
  category,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Button
      variant="outlined"
      color="orange"
      size="sm"
      className={
        selectedCategory === category
          ? 'rounded-full mx-1 my-1 text-white bg-orange-500'
          : 'rounded-full mx-1 my-1 text-white bg-transparent focus:ring-0'
      }
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </Button>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};
