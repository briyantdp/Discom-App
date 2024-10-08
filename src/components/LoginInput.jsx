/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import { Input, Button } from '@material-tailwind/react';

import useInput from '../hooks/useInput';

export default function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mt-8 mb-2 flex flex-col gap-3">
      <Input
        type="email"
        color="blue-gray"
        label="Email"
        placeholder="Email"
        size="lg"
        value={email}
        onChange={onEmailChange}
      />

      <Input
        type="password"
        color="blue-gray"
        label="Password"
        placeholder="Password"
        size="lg"
        value={password}
        onChange={onPasswordChange}
      />
      <Button className="bg-gray-800 shadow-none hover:shadow-sm hover:shadow-gray-500" onClick={() => login({ email, password })}>
        Log In
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
