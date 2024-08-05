import { Typography } from '@material-tailwind/react';

export default function LeaderboardSkeleton() {
  const dumpLeaders = [1, 2, 3, 4];

  return (
    <>
      {dumpLeaders.map((leader) => (
        <div key={leader} className="flex justify-between animate-pulse">
          <div className="flex items-start gap-3 my-4">
            <Typography
              as="div"
              variant="h6"
              className="size-10 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <div>
              <Typography
                as="div"
                variant="h6"
                className="h-3 w-56 rounded-full bg-gray-300 my-2"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="small"
                className="h-3 w-24 rounded-full bg-gray-300 my-2"
              >
                &nbsp;
              </Typography>
            </div>
          </div>
          <Typography
            as="div"
            variant="h6"
            className="size-10 rounded-lg bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      ))}
    </>
  );
}
