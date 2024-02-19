/* eslint-disable @typescript-eslint/unbound-method */
import React, { SetStateAction } from 'react';
import { 
  render, screen, cleanup,
} from 'root/utils/test-utils';
import UserPageComponent from 'root/containers/UserPageContainer';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { UserContext } from 'root/context/userContext';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import enUkTranslations from 'root/locale/enUk.json';

jest.mock('axios');
const contextCallback = jest.fn();

// Mocking de i18n en utilisant les trads enUk
const tMock = (key: string): string => key;
const config = {
  lng: 'enUk',
  fallbackLng: 'enUk',
  debug: false,
  interpolation: { escapeValue: false },
  resources: {
    enUk: { translation: enUkTranslations }, // Provide the translations to the i18next instance
  },
};
const i18nInstance = i18n.createInstance();
i18nInstance.init(config).then(() => {
}).catch(() => {
});
declare global {
  interface Window {
    t: (key: string) => string;
  }
}
window.t = tMock;

const renderPage = () => {
  render(
    <I18nextProvider i18n={i18nInstance}>
      <UserPageComponent />
      <UserContext.Consumer>{contextCallback}</UserContext.Consumer>
    </I18nextProvider>,
  );
  const editInfo = screen.getByLabelText('Edit my informations');
  const editPassword = screen.getByLabelText('Change my password');
  const close = screen.getByLabelText('Close');
  return {
    editInfo, editPassword, close,
  };
};

beforeAll(() => {
  function identity<T>(arg: T): T {
    return arg;
  }

  const setState = jest.fn<SetStateAction<string>, []>();
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [
      'none',
      identity(setState),
    ]);
});

afterAll(() => {
  cleanup();
  jest.resetAllMocks();
});

describe('Testing User Page container', () => {
  it('shows the message with the user informations from the (mocked) context', async () => {
    renderPage();
    expect(screen.queryAllByText('Welcome Kilian Maigrot, you are user n°1, now logged in with your email kilian.maigrot@gmail.com.').length).toEqual(1);
    expect(screen.getByLabelText('Name')).toHaveValue('Maigrot');
  });

  it('should display the right side with editInfo form on clicking on his button, then hide it on clicking on close', async () => {
    const formButtons = renderPage();
    const rightSideElement = formButtons.close.parentNode;
    const editInfosElement = document.querySelector('#editInfosForm')?.parentNode?.parentNode;
    expect(rightSideElement).toHaveStyle({ visibility: 'hidden' });
    expect(editInfosElement).toHaveStyle({ visibility: 'hidden' });
    await userEvent.click(formButtons.editInfo);
    expect(rightSideElement).toHaveStyle({ visibility: 'visible' });
    expect(editInfosElement).toHaveStyle({ visibility: 'visible' });
    await userEvent.click(screen.getByText('Close'));
    expect(rightSideElement).toHaveStyle({ visibility: 'hidden' });
    expect(editInfosElement).toHaveStyle({ visibility: 'hidden' });
  });

  it('should display the right side with editPassword form on clicking on his button, then hide it on clicking on close', async () => {
    const formButtons = renderPage();
    const rightSideElement = formButtons.close.parentNode;
    const editPasswordElement = document.querySelector('#editPasswordForm')?.parentNode?.parentNode;
    expect(rightSideElement).toHaveStyle({ visibility: 'hidden' });
    expect(editPasswordElement).toHaveStyle({ visibility: 'hidden' });
    await userEvent.click(formButtons.editInfo);
    expect(rightSideElement).toHaveStyle({ visibility: 'visible' });
    expect(editPasswordElement).toHaveStyle({ visibility: 'visible' });
    await userEvent.click(screen.getByText('Close'));
    expect(rightSideElement).toHaveStyle({ visibility: 'hidden' });
    expect(editPasswordElement).toHaveStyle({ visibility: 'hidden' });
  });
});
