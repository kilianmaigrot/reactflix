/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { 
  render, screen, waitFor, cleanup,
} from 'root/utils/test-utils';
import LoginFormComponent from 'root/containers/LoginForm';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';

const onLogin = jest.fn();
jest.mock('axios');

beforeEach(() => {
});

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('Testing Login Form', () => {
  it('shows empty errors if clikcing on confirm with 2 empty fields without sending the form', async () => {
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
  });

  it('shows empty error on focus lost on both fields', async () => { 
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    const emailInput = screen.getByLabelText('formT.emailLabel');
    const passwordInput = screen.getByLabelText('formT.passwordLabel');
    await userEvent.click(emailInput);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(1);
    await userEvent.click(passwordInput);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
  });

  it('shows incorrect error on focus lost on both fields with incorrect input', async () => { 
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    const emailInput = screen.getByLabelText('formT.emailLabel');
    const passwordInput = screen.getByLabelText('formT.passwordLabel');
    await userEvent.type(emailInput, 'aaa');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.email').length).toEqual(1);
    await userEvent.type(passwordInput, 'aaa');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(1);
  });

  it('doesn\'t shows incorrect error on focus lost on both fields with correct input', async () => { 
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    const emailInput = screen.getByLabelText('formT.emailLabel');
    const passwordInput = screen.getByLabelText('formT.passwordLabel');
    await userEvent.type(emailInput, 'kilian.maigrot@gmail.com');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.email').length).toEqual(0);
    await userEvent.type(passwordInput, 'aaaAAA123');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(0);
  });
    
  it('submits form data successfully', async () => {
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    const emailInput = screen.getByLabelText('formT.emailLabel');
    const passwordInput = screen.getByLabelText('formT.passwordLabel');
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const successLoginPayload = {
      status: 200,
      data: {
        token: 'tokenTest',
      },
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successLoginPayload);

    await userEvent.type(emailInput, 'kilian.maigrot@gmail.com');
    await userEvent.type(passwordInput, 'AR3SRW6Iy');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email: 'kilian.maigrot@gmail.com', password: 'AR3SRW6Iy' });
      expect(onLogin).toHaveBeenCalledWith(true);    
    });
  });

  it('submits form data unsuccessfully with a wrong password', async () => {
    render(
      <LoginFormComponent onLogin={onLogin}>
        <div />
      </LoginFormComponent>,
    );
    const emailInput = screen.getByLabelText('formT.emailLabel');
    const passwordInput = screen.getByLabelText('formT.passwordLabel');
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const failureLoginPayload = {
      response: {
        status: 401,      
      },
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(failureLoginPayload);

    await userEvent.type(emailInput, 'kilian.maigrot@gmail.com');
    await userEvent.type(passwordInput, 'ABCdef123');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email: 'kilian.maigrot@gmail.com', password: 'ABCdef123' });
      expect(screen.queryAllByText('formT.errorsTop.errorLogin').length).toEqual(1);
    });
  });
});
