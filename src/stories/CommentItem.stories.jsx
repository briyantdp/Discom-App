import React from 'react';
import { Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import CommentItem from '../components/CommentItem';

const stories = {
    title: 'CommentItem',
    component: CommentItem,
};

export default stories;

const TemplateStory = (args) => (
    <Wrapper>
        <div className="comment-list my-8">
            <Typography variant="h5" className="text-black mb-4">
                Komentar (1)
            </Typography>

            <CommentItem {...args} />
        </div>
    </Wrapper>
);

const withProps = TemplateStory.bind({});

withProps.args = {
    id: 'comment-1',
    authUser: { 
        id: 'user-1', 
        name: 'Bryant D.P',
    },
    owner: {
        name: 'Bryant D.P',
        avatar: 'https://i.pravatar.cc/300',
    },
    createdAt: '2024-03-01',
    content: 'Test fitur komentar',
    upVotesBy: [],
    downVotesBy: [],
  }

export { withProps };
