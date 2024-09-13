/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import {
  Avatar,
  Typography,
  ButtonGroup,
  Button,
} from '@material-tailwind/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

import {
  asyncUpVoteComment,
  asyncNeutralizeVoteComment,
  asyncDownVoteComment,
} from '../states/threadDetail/action';

import getCreatedTime from '../utils/getCreatedTime';

export default function CommentItem({
  id,
  authUser,
  owner,
  createdAt,
  content,
  upVotesBy,
  downVotesBy,
}) {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const upVoteCommentHandler = (threadId, commentId) => {
    dispatch(asyncUpVoteComment(threadId, commentId));
  };

  const neutralizeVoteCommentHandler = (threadId, commentId) => {
    dispatch(asyncNeutralizeVoteComment(threadId, commentId));
  };

  const downVoteCommentHandler = (threadId, commentId) => {
    dispatch(asyncDownVoteComment(threadId, commentId));
  };

  return (
    <div className="comment-item flex flex-col gap-4 py-8 border-t-2 border-gray-200">
      <div className="comment-item__author flex items-center gap-2">
        <Avatar
          src={owner.avatar}
          alt={owner.name}
          size="sm"
          className="threads__author__avatar"
        />
        <Typography
          variant="paragraph"
          className="threads__author__name text-black font-bold"
        >
          {owner.name}
        </Typography>
        <Typography
          variant="paragraph"
          className="threads__author__createdAt text-black"
        >
          {getCreatedTime(createdAt)}
        </Typography>
      </div>

      {parse(content)}

      <ButtonGroup className="w-fit flex bg-gray-800 gap-1 font-bold rounded-full divide-x-0">
        <Button
          className={
            upVotesBy.includes(authUser.id)
              ? 'comment__upvote rounded-full p-4 bg-gray-700 text-green-500'
              : 'comment__neutralize rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500'
          }
          onClick={() => (!upVotesBy.includes(authUser.id)
            ? upVoteCommentHandler(threadId, id)
            : neutralizeVoteCommentHandler(threadId, id))}
        >
          <ArrowUpIcon className="font-bold" width={15} />
        </Button>
        <span className="self-center text-white">
          {upVotesBy.length - downVotesBy.length}
        </span>
        <Button
          className={
            downVotesBy.includes(authUser.id)
              ? 'comment__downvote rounded-full p-4 bg-gray-700 text-green-500'
              : 'comment__neutralize rounded-full p-4 bg-transparent hover:bg-gray-700 hover:text-green-500'
          }
          onClick={() => (!downVotesBy.includes(authUser.id)
            ? downVoteCommentHandler(threadId, id)
            : neutralizeVoteCommentHandler(threadId, id))}
        >
          <ArrowDownIcon className="font-bold" width={15} />
        </Button>
      </ButtonGroup>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  authUser: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
};
