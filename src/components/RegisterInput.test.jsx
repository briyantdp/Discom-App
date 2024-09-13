/**
 * Scenario testing
 *
 * - RegisterInput component
 *  - should handle name input correctly
 *  - should handle email input correctly
 *  - should handle password input correctly
 *  - should handle register when register button is clicked
 */

import {
  beforeAll, afterEach, describe, expect, it,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  const mockAnimations = () => {
    Element.prototype.animate = vi.fn().mockImplementation(() => ({ finished: Promise.resolve() }));
  };

  beforeAll(() => {
    mockAnimations();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle name input correctly', async () => {
    render(
      <RegisterInput register={() => {}} />,
    );
    const nameInput = screen.getByPlaceholderText('Nama');

    await userEvent.type(nameInput, 'John Doe');

    expect(nameInput).toHaveValue('John Doe');
  });

  it('should handle email input correctly', async () => {
    render(
      <RegisterInput register={() => {}} />,
    );
    const emailInput = screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'email@dicoding.com');

    expect(emailInput).toHaveValue('email@dicoding.com');
  });

  it('should handle password input correctly', async () => {
    render(
      <RegisterInput register={() => {}} />,
    );
    const passwordInput = screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'admin123');

    expect(passwordInput).toHaveValue('admin123');
  });

  it('should handle register when register button is clicked', async () => {
    const userInput = {
      name: 'Thomas Alva',
      email: 'thomasalva@dicoding.com',
      password: 'thomasalva123',
    };

    const registerHandler = vi.fn();

    render(<RegisterInput register={registerHandler} />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, userInput.email);

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, userInput.password);

    const registerButton = screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(registerButton);

    expect(registerHandler).toHaveBeenCalled(userInput);
  });
});
