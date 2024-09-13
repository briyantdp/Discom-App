/* eslint-disable no-restricted-syntax */
/**
 * Scenario testing
 *
 * - Header component
 *  - should render navigation correctly
 *  - should handle home navigation correctly
 *  - should handle leaderboard navigation correctly
 *  - should handle create thread navigation correctly
 */

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  beforeAll, afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import Header from './Header';

import renderWithProviders from '../utils/renderWithProviders';

expect.extend(matchers);

const parsePathname = (url) => new URL(`https://localhose:5173${url}`).pathname;

const authUserExample = {
  id: 'users-1',
  name: 'John Doe',
  avatar: 'https://generated-image-url.jpg',
};

describe('Header component', () => {
  const mockAnimations = () => {
    Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render navigation correctly', () => {
    const expectedPaths = [
      '/',
      '/leaderboards',
      '/new',
    ];

    renderWithProviders(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: authUserExample,
        },
      },
    );

    const navigationLinks = screen.getAllByRole('link');
    const navigationPathnames = navigationLinks.map((link) => parsePathname(link.getAttribute('href')));

    expect(navigationLinks).toHaveLength(4);

    for (const pathname of expectedPaths) {
      expect(navigationPathnames).toContain(pathname);
    }
  });

  it('should handle home navigation correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/leaderboards" element={<div>Leaderboard Page</div>} />
          <Route path="/new" element={<div>Create Thread Page</div>} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: authUserExample,
        },
      },
    );

    const navigationLinks = screen.getAllByRole('link');
    const homeLink = navigationLinks.find((link) => link.getAttribute('href') === '/');
    await userEvent.click(homeLink);

    const homePage = screen.getByText('Home Page');
    expect(homePage).toBeInTheDocument();
  });

  it('should handle leaderboard navigation correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/leaderboards" element={<div>Leaderboards Page</div>} />
          <Route path="/new" element={<div>Create Thread Page</div>} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: authUserExample,
        },
      },
    );

    const navigationLinks = screen.getAllByRole('link');
    const leaderboardsLink = navigationLinks.find((link) => link.getAttribute('href') === '/leaderboards');
    await userEvent.click(leaderboardsLink);

    const leaderboardsPage = screen.getByText('Leaderboards Page');
    expect(leaderboardsPage).toBeInTheDocument();
  });

  it('should handle create thread navigation correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/leaderboards" element={<div>Leaderboard Page</div>} />
          <Route path="/new" element={<div>Create Thread Page</div>} />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: {
          authUser: authUserExample,
        },
      },
    );

    const navigationLinks = screen.getAllByRole('link');
    const createThreadLink = navigationLinks.find((link) => link.getAttribute('href') === '/new');
    await userEvent.click(createThreadLink);

    const createThreadPage = screen.getByText('Create Thread Page');
    expect(createThreadPage).toBeInTheDocument();
  });
});
