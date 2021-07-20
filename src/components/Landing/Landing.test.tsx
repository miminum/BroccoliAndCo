import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Landing }  from './Landing';

test('opens the modal', async () => {
  render(<Landing />);

  fireEvent.click(screen.getByText("Request an invite"));

  await waitFor(() => screen.getByText('Send'))

  expect(screen.getByText('Send')).toBeDefined()
});
