/**
 * Scenario testing
 *
 * - LoginInput component
 *  - should handle email input correctly
 *  - should handle password input correctly
 *  - should handle login when login button is clicked
 */

import {
  beforeAll, afterEach, describe, expect, it,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  const mockAnimations = () => {
    Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle email input correctly', async () => {
    render(
      <LoginInput login={() => {}} />,
    );
    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'username');

    expect(emailInput).toHaveValue('username');
  });

  it('should handle password input correctly', async () => {
    render(
      <LoginInput login={() => {}} />,
    );
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'admin123');

    expect(passwordInput).toHaveValue('admin123');
  });

  it('should handle login when login button is clicked', async () => {
    const userInput = {
      email: 'thomasalva@dicoding.com',
      password: 'thomasalva123',
    };

    const loginHandler = vi.fn();

    render(<LoginInput login={loginHandler} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, userInput.email);

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, userInput.password);

    const loginButton = screen.getByRole('button', { name: 'Log In' });
    await userEvent.click(loginButton);

    expect(loginHandler).toHaveBeenCalled(userInput);
  });
});
