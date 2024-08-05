/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import {
  Avatar,
  Typography,
  ButtonGroup,
  Button,
  Chip,
  Card,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

import {
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralizeVoteDetailThread,
} from '../states/detailThread/action';

import getCreatedTime from '../utils/getCreatedTime';

export default function ThreadDetail({ authUser, detailThread }) {
  const dispatch = useDispatch();

  const upVoteHandler = (threadId) => {
    dispatch(asyncUpVoteDetailThread(threadId));
  };

  const neutralizeVoteHandler = (threadId) => {
    dispatch(asyncNeutralizeVoteDetailThread(threadId));
  };

  const downVoteHandler = (threadId) => {
    dispatch(asyncDownVoteDetailThread(threadId));
  };

  return (
    <Card className="detail-thread__content container mx-auto w-4/5">
      <CardBody>
        <div className="mb-3 flex flex-col gap-4">
          <Typography variant="h4" className="text-black">
            {detailThread.title}
          </Typography>
          <Chip
            color="orange"
            size="sm"
            value={detailThread.category}
            className="w-fit rounded-full px-2"
          />
          <div className="detail-thread__content__author flex items-center gap-2">
            <Avatar
              src={detailThread.owner.avatar}
              alt={detailThread.owner.name}
              size="sm"
              className="threads__author__avatar"
            />
            <Typography
              variant="paragraph"
              className="threads__author__name text-black font-bold"
            >
              {detailThread.owner.name}
            </Typography>
            <Typography
              variant="paragraph"
              className="threads__author__createdAt text-black"
            >
              {getCreatedTime(detailThread.createdAt)}
            </Typography>
          </div>
          <hr />
          <div className="font-light text-black">
            {parse(detailThread.body)}
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <ButtonGroup className="flex bg-gray-800 gap-1 font-bold rounded-full">
            <Button
              className={`threads__upvote rounded-full p-4 ${
                detailThread.upVotesBy.includes(authUser.id)
                  ? 'bg-gray-700 text-green-500'
                  : 'bg-transparent hover:bg-gray-700 hover:text-green-500'
              }`}
              onClick={() => (!detailThread.upVotesBy.includes(authUser.id)
                ? upVoteHandler(detailThread.id)
                : neutralizeVoteHandler(detailThread.id))}
            >
              <ArrowUpIcon className="font-bold" width={15} />
            </Button>
            <span className="self-center text-white">
              {detailThread.upVotesBy.length - detailThread.downVotesBy.length}
            </span>
            <Button
              className={
                detailThread.downVotesBy.includes(authUser.id)
                  ? 'threads__downvote rounded-full p-4 bg-gray-700 text-red-500'
                  : 'threads__downvote rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-red-500'
              }
              onClick={() => (!detailThread.downVotesBy.includes(authUser.id)
                ? downVoteHandler(detailThread.id)
                : neutralizeVoteHandler(detailThread.id))}
            >
              <ArrowDownIcon className="font-bold" width={15} />
            </Button>
          </ButtonGroup>
          <a
            className="cursor-pointer inline-flex p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700
            items-center"
            href="#comment-thread"
          >
            <ChatBubbleBottomCenterTextIcon width={15} />
            <span className="ml-3 text-sm font-bold">
              {detailThread.comments.length}
            </span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

ThreadDetail.propTypes = {
  authUser: PropTypes.object.isRequired,
  detailThread: PropTypes.object.isRequired,
};
