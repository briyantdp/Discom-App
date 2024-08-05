/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  ButtonGroup,
} from '@material-tailwind/react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';

import getCreatedTime from '../utils/getCreatedTime';

export default function ThreadItem({
  authUser,
  id,
  title,
  category,
  user,
  createdAt,
  body,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const dispatch = useDispatch();
  const upVoteHandler = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const neutralizeVoteHandler = (threadId) => {
    dispatch(asyncNeutralizeVoteThread(threadId));
  };

  const downVoteHandler = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };
  return (
    <Card className="home-page__content__threads my-4 w-full" key={id}>
      <CardBody className="mb-3 flex flex-col gap-4">
        <Typography variant="h4" className="threads__title text-black">
          {title}
        </Typography>
        <Chip
          color="orange"
          size="sm"
          value={category}
          className="w-fit rounded-full px-2"
        />
        <div className="threads__author flex items-center gap-1 md:gap-2">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="sm"
            className="threads__author__avatar"
          />
          <Typography
            variant="paragraph"
            className="threads__author__name text-black font-bold"
          >
            {user.name}
          </Typography>
          <Typography
            variant="paragraph"
            className="threads__author__createdAt text-black"
          >
            {getCreatedTime(createdAt)}
          </Typography>
        </div>
        <hr />
        {parse(body)}
      </CardBody>
      <CardFooter className="group mt-8 inline-flex flex-wrap items-center gap-3">
        <ButtonGroup className="flex bg-gray-800 gap-1 font-bold rounded-full">
          <Button
            className={
              upVotesBy.includes(authUser)
                ? 'threads__upvote rounded-full p-4 bg-gray-700 text-green-500'
                : 'threads__upvote rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500'
            }
            onClick={() => (!upVotesBy.includes(authUser)
              ? upVoteHandler(id)
              : neutralizeVoteHandler(id))}
          >
            <ArrowUpIcon className="font-bold" width={15} />
          </Button>
          <Typography
            variant="paragraph"
            className="threads__votes self-center text-white"
          >
            {upVotesBy.length - downVotesBy.length}
          </Typography>
          <Button
            className={
              downVotesBy.includes(authUser)
                ? 'threads__downvote rounded-full p-4 bg-gray-700 text-red-500'
                : 'threads__downvote rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-red-500'
            }
            onClick={() => (!downVotesBy.includes(authUser)
              ? downVoteHandler(id)
              : neutralizeVoteHandler(id))}
          >
            <ArrowDownIcon className="font-bold" width={15} />
          </Button>
        </ButtonGroup>
        <Link
          className="threads__commentscursor-pointer inline-flex p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700
    items-center"
          to={`/threads/${id}`}
        >
          <ChatBubbleBottomCenterTextIcon width={15} />
          <span className="ml-3 text-sm font-bold">{totalComments}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

ThreadItem.propTypes = {
  authUser: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
};
