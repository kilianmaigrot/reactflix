/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { 
  render, screen, waitFor, cleanup,
} from 'root/utils/test-utils';
import EditPasswordFormComponent from 'root/containers/EditPasswordForm';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';
import { UserContext } from 'root/context/user-context';

jest.mock('axios');
const contextCallback = jest.fn();

const renderFormAndTargetInputs = () => {
  render(
    <div>
      <EditPasswordFormComponent />
      <UserContext.Consumer>{contextCallback}</UserContext.Consumer>
    </div>,
  );
  const oldPassword = screen.getByLabelText('formT.passwordOldLabel');
  const newPassword = screen.getByLabelText('formT.passwordNewLabel');
  return { oldPassword, newPassword };
};

beforeEach(() => {
});

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('RegisterForm', () => {
  it('shows empty errors if clicking on confirm with 2 empty fields without sending the form', async () => {
    render(<EditPasswordFormComponent />);
    await userEvent.click(screen.getByRole('button', { name: /confirm/i }));
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
  });

  it('shows empty error on focus lost on all fields', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.click(inputFields.oldPassword);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(1);
    await userEvent.click(inputFields.newPassword);
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.empty').length).toEqual(2);
  });

  it('shows incorrect error on focus lost on all fields with incorrect input', async () => { 
    const inputFields = renderFormAndTargetInputs();
    await userEvent.type(inputFields.oldPassword, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(1);
    await userEvent.type(inputFields.newPassword, 'a');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(2);
  });
    
  it('does not shows incorrect error on focus lost on both fields with correct input, and launch axios request', async () => {
    const inputFields = renderFormAndTargetInputs();
    const submitButton = screen.getByRole('button', { name: /confirm/i });
    const successPasswordEdit = {
      data: {},
    };
    const successLoginOrToken = {
      status: 200,
    };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successLoginOrToken); // Verif login avant edit
    (axios.get as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successLoginOrToken); // Verif token avant edit
    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successPasswordEdit); // Edit password
    
    await userEvent.type(inputFields.oldPassword, 'AR3SRW6Iy');
    await userEvent.type(inputFields.newPassword, 'ar3srw6iY');
    await userEvent.tab();
    expect(screen.queryAllByText('formT.errorMessages.password').length).toEqual(0);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', { email: 'kilian.maigrot@gmail.com', password: 'AR3SRW6Iy' }); // Verif login avant edit
      expect(axios.get).toHaveBeenCalledWith('/login/verifyToken', { headers: { Authorization: 'Bearer ' } }); // Verif token
      expect(axios.patch).toHaveBeenCalledWith('/users/updatePassword', { // Edit password
        idUser: '1',
        email: 'kilian.maigrot@gmail.com',
        oldPassword: 'AR3SRW6Iy',
        newPassword: 'ar3srw6iY',
      });
    });
  });
});
