import PropTypes from 'prop-types';

import { Card, CardBody, Typography } from '@material-tailwind/react';

import LeaderboardItem from './LeaderboardItem';
import LeaderboardSkeleton from './LeaderboardSkeleton';

export default function LeaderboardTable({ leaderboards }) {
  return (
    <Card className="w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5">
      <CardBody>
        <Typography variant="h5" color="black">
          Klasemen Pengguna Aktif
        </Typography>
        <div className="my-4 flex items-center justify-between">
          <Typography variant="small" color="black" className="font-bold">
            Nama
          </Typography>
          <Typography variant="small" color="black" className="font-bold">
            Skor
          </Typography>
        </div>
        <div className="divide-y divide-gray-200">
          {leaderboards.length === 0 && <LeaderboardSkeleton />}
          {leaderboards.map(({ score, user }) => (
            <LeaderboardItem key={user.id} user={user} score={score} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
});

LeaderboardTable.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      user: PropTypes.shape(userShape).isRequired,
    }),
  ).isRequired,
};
