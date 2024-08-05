import { Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      id="error-page"
      className=" bg-blue-gray-900 text-white h-screen flex flex-col items-center justify-center gap-6"
    >
      <Typography variant="h1" className="font-bold text-9xl">
        404
      </Typography>
      <Typography variant="small" className="text-xl">
        Oops! Halaman tidak ditemukan
      </Typography>
      <Button variant="outlined" color="white" className="w-fit">
        <Link to="/">Kembali ke halaman utama</Link>
      </Button>
    </div>
  );
}
