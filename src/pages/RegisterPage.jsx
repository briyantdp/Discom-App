import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';

import RegisterInput from '../components/RegisterInput';

import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <main className="register-page h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="black" className="text-center">
            Halaman Daftar
          </Typography>
          <RegisterInput register={registerHandler} />
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="flex justify-center">
            Sudah punya akun ?
            <Link to="/login" className="ml-1 font-bold text-blue-gray-900">
              Log in disini
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  );
}
