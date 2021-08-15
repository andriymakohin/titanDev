import React from 'react';
import { render } from '@testing-library/react';
import UserAuth from './UserAuth';

test('renders learn react link', () => {
  const { getByText } = render(<UserAuth />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
