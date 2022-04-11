/** @jest-environment jsdom */

import React from 'react';
import { render } from '@testing-library/react';
import App from 'src/renderer/views/App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });
});
