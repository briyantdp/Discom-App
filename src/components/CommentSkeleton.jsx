import { Typography } from '@material-tailwind/react';

export default function CommentSkeleton() {
  return (
    <div className="comment-skeleton flex flex-col gap-4 py-8 border-t-2 border-gray-200 animate-pulse">
      <div className="author-comment-skeleton flex items-center gap-2">
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
    </div>
  );
}
