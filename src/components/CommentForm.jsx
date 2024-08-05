import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Textarea } from '@material-tailwind/react';

import { asyncAddComment } from '../states/detailThread/action';

export default function CommentForm() {
  const authUser = useSelector((states) => states.authUser);

  const { threadId } = useParams();
  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const onContentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const createCommentHandler = (event) => {
    event.preventDefault();
    dispatch(asyncAddComment({ threadId, content }));
    setContent('');
  };
  return (
    <div className="comment-form">
      <div className="author-comment-form flex items-center gap-2">
        <img
          className="size-8 rounded-full object-cover object-center "
          src={authUser.avatar}
          alt={authUser.name}
        />
        <Typography variant="paragraph" className="text-black">
          <span className="font-bold">{authUser.name}</span>
        </Typography>
      </div>

      <form onSubmit={createCommentHandler}>
        <Textarea
          variant="static"
          placeholder="Komentar anda"
          rows={8}
          value={content}
          onChange={onContentChangeHandler}
        />
        <Button type="submit" className="bg-gray-800 rounded-full p-4 my-4">
          Comment
        </Button>
      </form>
    </div>
  );
}
