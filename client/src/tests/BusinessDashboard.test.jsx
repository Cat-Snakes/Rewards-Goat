import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessDashboard from '../businessdashboard/BusinessDashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('should render the BusinessDashboard component', () => {
  render(
    <MemoryRouter>
      <BusinessDashboard />
    </MemoryRouter>
  );

  expect(screen.getByText(/Welcome Business!/i)).toBeInTheDocument();
  expect(screen.getByText(/Enroll a customer/i)).toBeInTheDocument();
});

test('should navigate to the customer list when the button is clicked', () => {
  render(
    <MemoryRouter>
      <BusinessDashboard />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText(/List Of Current Customers/i));

  expect(window.location.pathname).toBe('/customerlist');
});
