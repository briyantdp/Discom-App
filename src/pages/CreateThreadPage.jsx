import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardBody, Typography } from '@material-tailwind/react';

import ThreadInput from '../components/ThreadInput';

import { asyncAddThread } from '../states/threads/action';

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addThreadHandler = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <main className="create-thread  flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="black" className="text-center">
            Tambah Thread
          </Typography>
          <ThreadInput addThread={addThreadHandler} />
        </CardBody>
      </Card>
    </main>
  );
}
