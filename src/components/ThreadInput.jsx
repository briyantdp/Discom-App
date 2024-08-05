import PropTypes from 'prop-types';

import { Input, Button, Textarea } from '@material-tailwind/react';

import useInput from '../hooks/useInput';

export default function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form className="mt-8 mb-2 flex flex-col gap-3">
      <Input
        type="text"
        label="Judul"
        size="lg"
        value={title}
        onChange={onTitleChange}
      />
      <Input
        type="text"
        label="Kategori"
        size="lg"
        value={category}
        onChange={onCategoryChange}
      />
      <Textarea
        variant="static"
        placeholder="Apa yang anda pikirkan ?"
        rows={8}
        value={body}
        onChange={onBodyChange}
      />
      <Button
        variant="gradient"
        onClick={() => addThread({ title, category, body })}
      >
        Buat
      </Button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};
