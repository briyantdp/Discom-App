/**
 * Scenario testing
 *
 * - ThreadInput component
 *  - should handle title input correctly
 *  - should handle category input correctly
 *  - should handle body input correctly
 *  - should handle add thread when "Buat" button is clicked
 */

import {
  beforeAll, afterEach, describe, expect, it,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  // const mockAnimations = () => {
  //   Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  // };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle title input correctly', async () => {
    render(
      <ThreadInput addThread={() => {}} />,
    );
    const titleInput = screen.getByPlaceholderText('Judul');

    await userEvent.type(titleInput, 'Belajar Redux lumayan susah');

    expect(titleInput).toHaveValue('Belajar Redux lumayan susah');
  });

  it('should handle category input correctly', async () => {
    render(
      <ThreadInput addThread={() => {}} />,
    );
    const categoryInput = screen.getByPlaceholderText('Kategori');

    await userEvent.type(categoryInput, 'redux');

    expect(categoryInput).toHaveValue('redux');
  });

  it('should handle body input correctly', async () => {
    render(
      <ThreadInput addThread={() => {}} />,
    );
    const bodyInput = screen.getByPlaceholderText('Apa yang anda pikirkan ?');

    await userEvent.type(bodyInput, 'Dalam waktu 2 minggu, belajar redux sungguh lumayan melelahkan...');

    expect(bodyInput).toHaveValue('Dalam waktu 2 minggu, belajar redux sungguh lumayan melelahkan...');
  });

  it('should handle add thread when "Buat" button is clicked', async () => {
    const newThread = {
      title: 'Belajar Redux lumayan susah',
      category: 'redux',
      body: 'Dalam waktu 2 minggu, belajar redux sungguh lumayan melelahkan...',
    };

    const addThreadHandler = vi.fn();

    render(<ThreadInput addThread={addThreadHandler} />);

    const titleInput = screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, newThread.title);

    const categoryInput = screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, newThread.category);

    const bodyInput = screen.getByPlaceholderText('Apa yang anda pikirkan ?');
    await userEvent.type(bodyInput, newThread.body);

    const addThreadButton = screen.getByRole('button', { name: 'Buat' });
    await userEvent.click(addThreadButton);

    expect(addThreadHandler).toHaveBeenCalled(newThread);
  });
});
