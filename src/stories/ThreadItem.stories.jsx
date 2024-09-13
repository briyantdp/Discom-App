import React from 'react';
import { Typography } from '@material-tailwind/react';

import Wrapper from './Wrapper';
import ThreadItem from '../components/ThreadItem';

const stories = {
    title: 'ThreadItem',
    component: ThreadItem,
};

export default stories;

const TemplateStory = (args) => (
    <Wrapper>
        <section className="my-6 home-page__content p-4 rounded-xl w-full md:w-2/3 lg:w-3/5">
            <Typography variant="h3">Diskusi Tersedia</Typography>
            <ThreadItem {...args} />
        </section>
    </Wrapper>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    authUser: { name: 'Bryant D.P' },
    id: 'thread-1',
    title: 'Belajar redux lumayan susah',
    category: 'Redux',
    user: {
        name: 'Bryant D.P',
        avatar: 'https://i.pravatar.cc/300',
    },
    createdAt: '2024-03-01',
    body: 'Menurut saya, redux kurang cocok untuk pemula. Mending langsung belajar useReducer atau Zustand',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    owner: { name: 'Bryant D.P' },
  }

export { withProps };