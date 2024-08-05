import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

export default function ThreadSkeleton() {
  const dumpThreads = [1, 2];
  return (
    <>
      {dumpThreads.map((dumpThread) => (
        <Card
          className="home-page__content__threads my-4 w-full animate-pulse"
          key={dumpThread}
        >
          <CardBody className="mb-3 flex flex-col gap-4">
            <Typography
              as="div"
              variant="h4"
              className="h-8 w-4/5 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="small"
              className="h-6 w-16 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <div className="threads__author flex items-center gap-2">
              <Typography
                as="div"
                variant="h6"
                className="size-10 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="h-6 w-24 rounded-full bg-gray-300 my-2"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="h-6 w-36 rounded-full bg-gray-300 my-2"
              >
                &nbsp;
              </Typography>
            </div>
            <hr />
            <div className="skeleton-paragraph">
              <Typography
                as="div"
                variant="paragraph"
                className="my-2 h-3 w-4/5 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="my-2 h-3 w-3/5 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="paragraph"
                className="my-2 h-3 w-2/5 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
            &nbsp;
          </CardBody>
          <CardFooter className="group inline-flex flex-wrap items-center gap-3">
            <Typography
              as="div"
              variant="small"
              className="h-10 w-32 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="small"
              className="h-10 w-14 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
