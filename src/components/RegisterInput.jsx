/* eslint-disable import/no-extraneous-dependencies */
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
        color="blue-gray"
        placeholder="Nama"
        label="Nama"
        size="lg"
        value={name}
        onChange={onNameChange}
      />
      <Input
        type="email"
        color="blue-gray"
        placeholder="Email"
        label="Email"
        size="lg"
        value={email}
        onChange={onEmailChange}
      />
      <Input
        type="password"
        color="blue-gray"
        placeholder="Password"
        label="Password"
        size="lg"
        value={password}
        onChange={onPasswordChange}
      />
      <Button
        className="bg-gray-800 shadow-none hover:shadow-sm hover:shadow-gray-500"
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
