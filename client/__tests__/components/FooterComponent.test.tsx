/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { render, cleanup, waitFor } from 'root/utils/test-utils';
import FooterPageComponent from 'root/components/Footer';
import '@testing-library/jest-dom';
import { UserContext } from 'root/context/userContext';
import { StyleThemeContext } from 'root/context/styleContext';
import { userEvent } from '@testing-library/user-event';
import axios from 'axios';

jest.mock('axios');
const contextCallback = jest.fn();

const renderFooterAndTargetToggles = () => {
  render(
    <div>
      <FooterPageComponent />
      <UserContext.Consumer>{contextCallback}</UserContext.Consumer>
      <StyleThemeContext.Consumer>{contextCallback}</StyleThemeContext.Consumer>
    </div>,
  );
  
  const darkmode = document.getElementById('darkmodeToggle') as HTMLElement;
  const language = document.getElementById('languageToggle') as HTMLElement;
  return {
    darkmode, language,
  };
};

beforeAll(() => {
});

afterAll(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('Footer Page Component, testing DarkmodeToggle and LanguageToggle as well', () => {
  it('renders DarkmodeToggleButton with correct toggled prop', () => {
    const toggleInputs = renderFooterAndTargetToggles();       
    expect(toggleInputs.darkmode).toHaveAttribute('checked');
  });

  it('renders LanguageToggleButton with correct toggled prop', () => {
    const toggleInputs = renderFooterAndTargetToggles();
    expect(toggleInputs.language).not.toHaveAttribute('checked');
  });

  it('set toggle state on click on toggleLanguage and edited the language in the DB', async () => {
    const successPayload = {
      status: 200,
    };

    (axios.get as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successPayload); // Verif token avant edit
    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce(successPayload);

    const toggleInputs = renderFooterAndTargetToggles();
    await userEvent.click(toggleInputs.language);

    expect(toggleInputs.language).toHaveAttribute('checked');

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/login/verifyToken', { headers: { Authorization: 'Bearer ' } }); // Verif token
      expect(axios.patch).toHaveBeenCalledWith('/users/updateLanguage', {
        userLanguage: 'enUk',
        idUser: '1',
      });
    });
  });

  it('set toggle state on click on toggleDarkmode and edited the style in the context', async () => {
    const toggleInputs = renderFooterAndTargetToggles();
    await userEvent.click(toggleInputs.darkmode);
    expect(toggleInputs.darkmode).not.toHaveAttribute('checked');
  });
});
