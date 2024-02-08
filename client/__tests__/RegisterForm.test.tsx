/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { 
  render, screen, waitFor, cleanup,
} from 'root/utils/test-utils';
import RegisterFormComponent from 'root/containers/RegisterForm';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');

const renderFormAndTargetInputs = () => {
  render(
    <RegisterFormComponent>
      <div />
    </RegisterFormComponent>,
  );
  const name = screen.getByLabelText('formT.nameLabel');
  const surname = screen.getByLabelText('formT.surnameLabel');
  const email = screen.getByLabelText('formT.emailLabel');
  const password = screen.getByLabelText('formT.passwordLabel');
  return {
    name, surname, email, password,
  };
};

beforeEach(() => {
});

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('RegisterForm', () => {
  it('shows empty errors if clikcing on confirm with 4 empty fields without sending the form', async () => {
    render(
      <RegisterFormComponent>
        <div />
      </RegisterFormComponent>,
    );
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(4);
  });

  it('shows empty error on focus lost on all fields', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.click(inputFields.name);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(1);
    await userEvent.click(inputFields.surname);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
    await userEvent.click(inputFields.email);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(3);
    await userEvent.click(inputFields.password);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(4);
  });

  it('shows incorrect error on focus lost on all fields with incorrect input', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.type(inputFields.name, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.name').length).toEqual(1);
    await userEvent.type(inputFields.surname, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.surname').length).toEqual(1);
    await userEvent.type(inputFields.email, 'aaa');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.email').length).toEqual(1);
    await userEvent.type(inputFields.password, 'aaa');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(1);
  });
    
  it('doesn\'t shows incorrect error on focus lost on both fields with correct input, and launch axios request', async () => {
    const inputFields = renderFormAndTargetInputs();
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const successRegisterPayload = {
      data: {
        idUser: 1,
        name: 'Maigrot',
        surname: 'Kilian',
        email: 'kilian.maigrot@gmail.com',
        userLanguage: 'frFr',
      },
    };
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successRegisterPayload);
    
    await userEvent.type(inputFields.name, 'Maigrot');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.name').length).toEqual(0);
    await userEvent.type(inputFields.surname, 'Kilian');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.surname').length).toEqual(0);
    await userEvent.type(inputFields.email, 'kilian.maigrot@gmail.com');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.email').length).toEqual(0);
    await userEvent.type(inputFields.password, 'AR3SRW6Iy');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(0);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/users/register', {
        name: 'Maigrot', surname: 'Kilian', email: 'kilian.maigrot@gmail.com', password: 'AR3SRW6Iy',
      });
    });
  });
});
