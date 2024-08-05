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
        icon={<i className="fas fa-heart" />}
      />
      <Button variant="gradient" onClick={() => login({ email, password })}>
        Log In
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
