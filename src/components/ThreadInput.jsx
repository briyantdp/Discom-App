/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';

import { Input, Button, Textarea } from '@material-tailwind/react';

import useInput from '../hooks/useInput';

export default function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form className="mt-8 mb-2 flex flex-col gap-3" onSubmit={() => addThread({ title, category, body })}>
      <Input
        type="text"
        color='blue-gray'
        label="Judul"
        placeholder="Judul"
        size="lg"
        value={title}
        onChange={onTitleChange}
        required
      />
      <Input
        type="text"
        color='blue-gray'
        label="Kategori"
        placeholder="Kategori"
        size="lg"
        value={category}
        onChange={onCategoryChange}
        required
      />
      <Textarea
        variant="static"
        color='blue-gray'
        placeholder="Apa yang anda pikirkan ?"
        rows={8}
        value={body}
        onChange={onBodyChange}
      />
      <Button
        type='submit'
       className="bg-gray-800 shadow-none hover:shadow-sm hover:shadow-gray-500"
      >
        Buat
      </Button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
