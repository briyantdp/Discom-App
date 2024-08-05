import { Typography } from '@material-tailwind/react';

export default function CategorySkeleton() {
  const dumpCategories = [1, 2, 3, 4];
  return (
    <div className="flex gap-4 animate-pulse">
      {dumpCategories.map((dumpCategory) => (
        <Typography
          as="div"
          variant="small"
          className="h-8 w-24 rounded-full bg-gray-300"
          key={dumpCategory}
        >
          &nbsp;
        </Typography>
      ))}
    </div>
  );
}
