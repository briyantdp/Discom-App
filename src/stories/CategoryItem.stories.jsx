import { Typography } from '@material-tailwind/react';

import CategoryItem from '../components/CategoryItem';

const stories = {
    title: 'CategoryItem',
    component: CategoryItem,
};

export default stories;

const TemplateStory = (args) => (
    <section className="my-6 home-page__categories-list p-4 w-full md:w-1/3 lg:w-2/5">
        <Typography variant="h3">Kategori Populer</Typography>
            <div className="btn-group-categories-list my-2">
            <CategoryItem {...args} />
        </div>
    </section>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    category: 'Redux',
    selectedCategory: 'Redux',
    setSelectedCategory: () => {},
}

export { withProps };