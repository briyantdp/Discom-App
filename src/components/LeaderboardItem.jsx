import PropTypes from 'prop-types';
import { Typography, Avatar } from '@material-tailwind/react';

export default function LeaderboardItem({ user, score }) {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between pb-3 pt-3 last:pb-0"
    >
      <div className="flex items-center gap-x-3">
        <Avatar
          size="sm"
          src={`https://ui-avatars.com/api/?name=${user.avatar}&background=random`}
          alt={user.name}
        />
        <div>
          <Typography color="blue-gray" variant="h6">
            {user.name}
          </Typography>
          <Typography variant="small" color="gray">
            {user.email}
          </Typography>
        </div>
      </div>
      <Typography color="blue-gray" variant="h6">
        {score}
      </Typography>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};
