import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";

import { asyncFetchLeaderboards } from "../states/leaderboard/action";

export default function LeaderboardPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5">
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <Typography variant="h5" color="black">
              Leaderboard
            </Typography>
            <Typography variant="small" color="black" className="font-bold">
              Score
            </Typography>
          </div>
          <div className="divide-y divide-gray-200">
            {leaderboards.map(({ score, user }) => (
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
            ))}
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
