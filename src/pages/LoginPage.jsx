import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import useInput from "../hooks/useInput";

import { asyncSetAuthUser } from "../states/authUser/action";

export default function LoginPage() {
  const dispatch = useDispatch();

  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <main className="login-page h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="black" className="text-center">
            Log In
          </Typography>
          <form
            className="mt-8 mb-2 flex flex-col gap-3"
            onSubmit={loginHandler}
          >
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={onEmailChange}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={onPasswordChange}
            />
            <Button type="submit" variant="gradient">
              Log In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Belum punya akun ?
            <Link to="/register">
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Daftar di sini
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  );
}
