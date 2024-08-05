/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */

import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';

import CategoryItem from './CategoryItem';
import CategorySkeleton from './CategorySkeleton';

export default function CategorySection({
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <section className="my-6 home-page__categories-list p-4 w-full md:w-1/3 lg:w-2/5">
      <Typography variant="h3">Kategori Populer</Typography>
      <div className="btn-group-categories-list my-2">
        {categories.length === 0 && <CategorySkeleton />}
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
    </section>
  );
}

CategorySection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};
