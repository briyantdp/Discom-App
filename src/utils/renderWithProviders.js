/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-extraneous-dependencies

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../states';

function renderWithProviders(
  renderedComponent,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return React.createElement(Provider, { store }, children);
  }
  return { store, ...render(renderedComponent, { wrapper: Wrapper, ...renderOptions }) };
}

export default renderWithProviders;
