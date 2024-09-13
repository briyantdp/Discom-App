import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LeaderboardTable from '../components/LeaderboardTable';

import { asyncFetchLeaderboards } from '../states/leaderboard/action';

export default function LeaderboardPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <main className="leaderboards min-h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <LeaderboardTable leaderboards={leaderboards} />
    </main>
  );
}
