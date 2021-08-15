import React from 'react';
import { render } from '@testing-library/react';
import MainSignIn from './MainSignIn';

test('renders learn react link', () => {
  const { getByText } = render(<MainSignIn />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
