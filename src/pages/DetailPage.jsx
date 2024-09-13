import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card, CardBody } from '@material-tailwind/react';

import ThreadDetail from '../components/ThreadDetail';
import ThreadDetailSkeleton from '../components/ThreadDetailSkeleton';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import CommentSkeleton from '../components/CommentSkeleton';

import { asyncReceiveThreadDetail } from '../states/threadDetail/action';

export default function DetailPage() {
  const authUser = useSelector((states) => states.authUser);
  const threadDetail = useSelector((state) => state.threadDetail);
  const dispatch = useDispatch();

  const { threadId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  if (threadDetail === null) {
    navigate('/');
  }

  if (!threadDetail?.owner) {
    return (
      <main className="detail-thread-skeleton flex flex-col gap-4 py-56 md:py-48 lg:py-36 lg:container lg:mx-auto">
        <ThreadDetailSkeleton />

        <Card
          className="detail-thread__comment-skeleton container mx-auto w-4/5"
          id="comment-thread"
        >
          <CardBody>
            <CommentSkeleton />
          </CardBody>
        </Card>
      </main>
    );
  }

  return (
    <main className="detail-thread flex flex-col gap-4 py-56 md:py-48 lg:py-36 lg:container lg:mx-auto text-white">
      <ThreadDetail authUser={authUser} threadDetail={threadDetail} />
      <Card
        className="detail-thread__comment container mx-auto w-4/5"
        id="comment-thread"
      >
        <CardBody>
          <CommentForm authUser={authUser} />
          <CommentList />
        </CardBody>
      </Card>
    </main>
  );
}
