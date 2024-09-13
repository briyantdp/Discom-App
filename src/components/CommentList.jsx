/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */

import { useSelector } from 'react-redux';
import { Typography } from '@material-tailwind/react';

import CommentItem from './CommentItem';

export default function CommentList() {
  const authUser = useSelector((states) => states.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);

  return (
    <div className="comment-list my-8">
      <Typography variant="h5" className="text-black mb-4">
        Komentar (
        {threadDetail.comments.length}
        )
      </Typography>

      {threadDetail.comments.map((data, index) => (
        <CommentItem {...data} key={index} authUser={authUser} />
      ))}
    </div>
  );
}
