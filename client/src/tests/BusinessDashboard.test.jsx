import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BusinessDashboard from '../businessdashboard/BusinessDashboard';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

//!Mock of useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

//!rendering testing
describe('rendering test', () => {
  //!testing the BusinessDashboard react component is rendering
  test('should render the BusinessDashboard component', () => {
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome Business!/i)).toBeInTheDocument();
    expect(screen.getByText(/Enroll a customer/i)).toBeInTheDocument();
  });

  //!testing the inputs and buttons are rendered to the screen
  test('the inputs and buttons are rendered to the screen', () => {
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Logout!/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Customer Name Here/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter Client Phone Number Here/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Add New Customer!/i)).toBeInTheDocument();
    expect(screen.getByText(/List Of Current Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/View Current Rewards/i)).toBeInTheDocument();
  });
});

//!functionality testing
describe('functionality test', () => {
  //!testing the customer list button
  test('should navigate to the customer list when the button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/List Of Current Customers/i));
    expect(mockNavigate).toHaveBeenCalledWith('/customerlist', {
      state: { username: undefined },
    });
  });

  //!testing the current rewards button
  test('should navigate to view current rewards when the button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/View Current Rewards/i));
    expect(mockNavigate).toHaveBeenCalledWith('/businessrewards', {
      state: { username: undefined },
    });
  });

  //!testing the logout button is working
  test('should navigate to the login page when the button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Logout!/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  //!testing the customer name input is working
  test('the customer name input works', () => {
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Enter Customer Name Here');
    fireEvent.change(input, { target: { value: 'customer name test' } });
    expect(input.value).toBe('customer name test');
  });

  //!testing the customer name input is updating the state
  test('the value for the state of customer name is updating', () => {
    const mockSetCustomerName = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['', mockSetCustomerName]);
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Enter Customer Name Here');
    fireEvent.change(input, { target: { value: 'T' } });
    expect(mockSetCustomerName).toHaveBeenCalledWith('T');
    fireEvent.change(input, { target: { value: 'TE' } });
    expect(mockSetCustomerName).toHaveBeenCalledWith('TE');
    fireEvent.change(input, { target: { value: 'TES' } });
    expect(mockSetCustomerName).toHaveBeenCalledWith('TES');
    fireEvent.change(input, { target: { value: 'TEST' } });
    expect(mockSetCustomerName).toHaveBeenCalledWith('TEST');
  });

  //!testing the phone number input is working
  test('the phone number input works', () => {
    render(
      <MemoryRouter>
        <BusinessDashboard />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Enter Client Phone Number Here');
    fireEvent.change(input, { target: { value: 'phone number test' } });
    expect(input.value).toBe('phone number test');
  });
});
