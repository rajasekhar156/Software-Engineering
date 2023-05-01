import React from 'react';
import { render, fireEvent , screen} from '@testing-library/react';
import { getByTestId,getByRole , getByText, getByLabelText} from '@testing-library/react';
import { Login } from './Login';
import { Route, Router } from 'react-router-dom';

test('renders login page without crashing', () => {
  <Router>render(<Login />)</Router>
  
});

test('displays correct input fields', () => {
  // const { getByLabelText } = 
  <Router>render(<Login />)</Router>;
  // expect(null).toBeDefined();
  expect(screen.getByTestId('text-input-element')).toBeInTheDocument();
  expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
});

test('requires username and password', () => {
  const { getByLabelText, getByText } = <Router>render(<Login />)</Router>;
  fireEvent.change(getByLabelText('UserId'), { target: { value: '' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: '' } });
  fireEvent.click(getByText('Sign In'));
  expect(getByText('UserId is required.')).toBeInTheDocument();
  expect(getByText('Password is required.')).toBeInTheDocument();
});

test('enables login button when both fields are filled', () => {
  const { getByLabelText, getByText } = <Router>render(<Login />)</Router>;
  fireEvent.change(getByLabelText('UserId'), { target: { value: 'testuser' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'testpass' } });
  expect(getByText('Sign In')).not.toBeDisabled();
});

test('disables login button when either field is empty', () => {
  const { getByLabelText, getByText } = <Router>render(<Login />)</Router>;
  fireEvent.change(getByLabelText('UserId'), { target: { value: 'testuser' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: '' } });
  expect(getByText('Sign In')).toBeDisabled();
});

test('calls login function when login button is clicked', () => {
  const mockLogin = jest.fn();
  const { getByLabelText, getByText } = <Router>render(<Login onLogin={mockLogin} />)</Router> ;
  fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'testpass' } });
  fireEvent.click(getByText('Login'));
  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass');
});

test('displays error message on incorrect login', () => {
  const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
  const { getByLabelText, getByText } = <Router>render(<Login onLogin={mockLogin} />)</Router>;
  fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByLabelText('Password'), { target: { value: 'testpass' } });
  fireEvent.click(getByText('Login'));
  expect(getByText('Invalid username or password.')).toBeInTheDocument();
});

test
