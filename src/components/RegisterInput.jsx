import PropTypes from 'prop-types';

import { Input, Button } from '@material-tailwind/react';

import useInput from '../hooks/useInput';

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mt-8 mb-2 flex flex-col gap-3">
      <Input
        type="text"
        label="Nama"
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
      <Button
        variant="gradient"
        onClick={() => register({ name, email, password })}
      >
        Daftar
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
