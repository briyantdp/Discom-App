/* eslint-disable max-len */
/**
 * Scenario testing
 *
 * - ThreadDetail component
 *  - should render thread detail correctly
 *  - should handle up vote button click correctly
 *  - should handle down vote button click correctly
 */

import {
  beforeAll, afterEach, vi, describe, expect, it,
} from 'vitest';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import ThreadDetail from './ThreadDetail';

import getCreatedTime from '../utils/getCreatedTime';
import renderWithProviders from '../utils/renderWithProviders';

expect.extend(matchers);

const authUserExample = {
  id: 'users-1',
  name: 'Bryant D.P',
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
    name: 'Bryant D.P',
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
        name: 'Bryant D.P',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('ThreadDetail component', () => {
  // const mockAnimations = () => {
  //   Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  // };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render thread detail correctly', () => {
    const preloadedState = {
      authUser: authUserExample,
      threadDetail: threadDetailExample,
    };

    renderWithProviders(<ThreadDetail authUser={authUserExample} threadDetail={threadDetailExample} />, {
      preloadedState,
    });

    const buttons = screen.getAllByRole('button');

    const contents = [
      screen.getByText(threadDetailExample.title),
      screen.getByText(threadDetailExample.category),
      screen.getAllByAltText(threadDetailExample.owner.name),
      screen.getByText(threadDetailExample.owner.name),
      screen.getByText(getCreatedTime(threadDetailExample.createdAt)),
      screen.getByText(threadDetailExample.body),
      ...buttons,
    ];

    contents.forEach((content) => waitFor(() => expect(content).toBeInTheDocument()));
  });

  it('should handle up vote button click correctly', async () => {
    const preloadedState = {
      authUser: authUserExample,
      threadDetail: threadDetailExample,
    };

    const { store } = renderWithProviders(<ThreadDetail authUser={authUserExample} threadDetail={threadDetailExample} />, { preloadedState });

    const [upVoteButton] = screen.getAllByRole('button');
    await userEvent.click(upVoteButton);

    const { threadDetail, authUser } = store.getState();
    expect(threadDetail.upVotesBy).toContainEqual(authUser.id);
  });

  it('should handle down vote button click correctly', async () => {
    const preloadedState = {
      authUser: authUserExample,
      threadDetail: threadDetailExample,
    };

    const { store } = renderWithProviders(<ThreadDetail authUser={authUserExample} threadDetail={threadDetailExample} />, { preloadedState });

    const [, downVoteButton] = screen.getAllByRole('button');
    await userEvent.click(downVoteButton);

    const { threadDetail, authUser } = store.getState();
    expect(threadDetail.downVotesBy).toContainEqual(authUser.id);
  });
});
