import { Link, useNavigate } from "react-router-dom";
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

import { asyncRegisterUser } from "../states/users/action";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const registerHandler = (event) => {
    event.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate("/");
  };

  return (
    <main className="register-page h-screen flex flex-col justify-center items-center py-56 md:py-48 lg:py-36">
      <Card className="w-full md:w-3/4 lg:w-1/2 xl:w-1/4">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="black" className="text-center">
            Register Page
          </Typography>
          <form
            className="mt-8 mb-2 flex flex-col gap-3"
            onSubmit={registerHandler}
          >
            <Input
              type="text"
              label="Name"
              size="lg"
              value={name}
              onChange={onNameChange}
            />
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
              Register
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="flex justify-center">
            Sudah punya akun ?
            <Link to="/login">
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Log in disini
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </main>
  );
}
