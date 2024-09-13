/**
 * Scenario testing
 *
 * - CommentForm component
 *  - should handle comment input (textarea) correctly
 *  - should handle comment when Comment button is clicked
 */

import {
  beforeAll, afterEach, describe, expect, it,
  vi,
} from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import CommentForm from './CommentForm';

import renderWithProviders from '../utils/renderWithProviders';
import api from '../utils/api';

expect.extend(matchers);

const authUserExample = {
  id: 'users-1',
  name: 'John Doe',
  avatar: 'https://generated-image-url.jpg',
};

const threadDetailExample = {
  id: 'thread-1',
  title: 'Belajar Redux lumayan susah',
  body: 'Saya mempelajari redux sampai 7 hari baru paham',
  category: 'redux',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Betul sekali, saya memilih mempelajari Zustand',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('CommentForm component', () => {
  const mockAnimations = () => {
    Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle comment input (textarea) correctly', async () => {
    const preloadedState = {
      authUser: authUserExample,
    };

    renderWithProviders(<CommentForm />, {
      preloadedState,
    });

    const commentInput = screen.getByPlaceholderText('Komentar anda');

    await userEvent.type(commentInput, 'Tes fitur komentar');

    expect(commentInput).toHaveValue('Tes fitur komentar');
  });

  it('should handle comment when Comment button is clicked', async () => {
    const preloadedState = {
      authUser: authUserExample,
      threadDetail: threadDetailExample,
    };

    api.createComment = ({ id = 'comment-n', content }) => Promise.resolve({ id, content });

    const { store } = renderWithProviders(<CommentForm />, {
      preloadedState,
    });

    const commentInput = screen.getByPlaceholderText('Komentar anda');
    await userEvent.type(commentInput, 'Tes fitur komentar lagi');

    const buttonComment = screen.getByRole('button', { name: 'Comment' });
    await userEvent.click(buttonComment);

    const states = store.getState();

    expect(states.threadDetail.comments).toHaveLength(2);
    expect(states.threadDetail.comments[1].content).toEqual('Tes fitur komentar lagi');
    expect(commentInput).toHaveTextContent('');
  });
});
