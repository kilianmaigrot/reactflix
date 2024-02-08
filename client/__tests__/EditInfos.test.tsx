/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { 
  render, screen, waitFor, cleanup,
} from 'root/utils/test-utils';
import EditInfosFormComponent from 'root/containers/EditInfosForm';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { UserContext } from 'root/context/user-context';

jest.mock('axios');
const contextCallback = jest.fn();

const renderFormAndTargetInputs = () => {
  render(
    <div>
      <EditInfosFormComponent />
      <UserContext.Consumer>{contextCallback}</UserContext.Consumer>
    </div>,
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
  it('shows the user data in the context beside the password', async () => {
    const inputFields = renderFormAndTargetInputs();
    expect(inputFields.name).toHaveValue('Maigrot');
    expect(inputFields.surname).toHaveValue('Kilian');
    expect(inputFields.email).toHaveValue('kilian.maigrot@gmail.com');
  });

  it('restore the initial values on cancel', async () => {
    const inputFields = renderFormAndTargetInputs();
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.clear(inputFields.name);
    await userEvent.clear(inputFields.surname);
    await userEvent.clear(inputFields.email);
    await userEvent.click(cancelButton);
    expect(inputFields.name).toHaveValue('Maigrot');
    expect(inputFields.surname).toHaveValue('Kilian');
    expect(inputFields.email).toHaveValue('kilian.maigrot@gmail.com');
  });

  it('shows empty errors if clicking on confirm with 4 empty fields without sending the form', async () => {
    const inputFields = renderFormAndTargetInputs();
    await userEvent.clear(inputFields.name);
    await userEvent.clear(inputFields.surname);
    await userEvent.clear(inputFields.email);
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(4);
  });

  it('shows empty error on focus lost on all fields if empty', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.clear(inputFields.name);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(1);
    await userEvent.clear(inputFields.surname);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
    await userEvent.clear(inputFields.email);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(3);
    await userEvent.click(inputFields.password);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(4);
  });

  it('shows incorrect error on focus lost on all fields with incorrect input', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.clear(inputFields.name);
    await userEvent.type(inputFields.name, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.name').length).toEqual(1);
    await userEvent.clear(inputFields.surname);
    await userEvent.type(inputFields.surname, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.surname').length).toEqual(1);
    await userEvent.clear(inputFields.email);
    await userEvent.type(inputFields.email, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.email').length).toEqual(1);
    await userEvent.type(inputFields.password, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(1);
  });
    
  it('does not shows incorrect error on focus lost on both fields with correct input, and launch axios request', async () => {
    const inputFields = renderFormAndTargetInputs();
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const successInfosEdit = {
      data: {},
    };
    const successLoginOrToken = {
      status: 200,
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successLoginOrToken); // Verif login avant edit
    (axios.get as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successLoginOrToken); // Verif token avant edit
    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successInfosEdit); // Edit infos
    
    await userEvent.type(inputFields.password, 'AR3SRW6Iy');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(0);
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(0);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email: 'kilian.maigrot@gmail.com', password: 'AR3SRW6Iy' }); // Verif login
      expect(axios.get).toHaveBeenCalledWith('/login/verifyToken', { headers: { Authorization: 'Bearer ' } }); // Verif token
      expect(axios.patch).toHaveBeenCalledWith('/users/updateUser', { // Edit infos
        idUser: '1',
        email: 'kilian.maigrot@gmail.com',
        name: 'Maigrot',
        surname: 'Kilian',
        password: 'AR3SRW6Iy',
      });
    });
  });

  it('shows a wrong password error with a wrong password', async () => {
    const inputFields = renderFormAndTargetInputs();
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const successInfosEdit = {
      data: {},
    };
    const failureLoginOrToken = {
      response: {
        status: 401,      
      },
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(failureLoginOrToken); // Verif login avant edit
    (axios.get as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(failureLoginOrToken); // Verif token avant edit
    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successInfosEdit); // Edit infos
    
    await userEvent.type(inputFields.password, 'ABCdef123');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(0);
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(0);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email: 'kilian.maigrot@gmail.com', password: 'ABCdef123' }); // Verif login
      expect(screen.queryAllByText('formT.errorsTop.editWrongPassword').length).toEqual(1);
    });
  });
});
