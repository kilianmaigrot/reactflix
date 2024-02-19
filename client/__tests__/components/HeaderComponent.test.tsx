import { cleanup, render, screen } from 'root/utils/test-utils';
import HeaderPageComponentWithTranslation from 'root/components/Header';
import '@testing-library/jest-dom';
import React from 'react';

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('HeaderPageComponent logged', () => {   
  it('display the correct menu for a logged user', () => {
    render(
      <HeaderPageComponentWithTranslation />,
    );
    
    const nonUserNav = document.getElementById('nonUserNav');
    const userInfos = document.getElementById('userInfos');
    const userNav = document.getElementById('userNav');

    expect(nonUserNav).toHaveStyle({ display: 'none' });
    expect(userInfos).toHaveStyle({ display: 'flex' });    
    const userNameDisplay: HTMLElement | null = screen.getByText(/kilian/i);
    expect(userNameDisplay).toBeInTheDocument();
    expect(userNav).toHaveStyle({ display: 'inline' });
  });
});

describe('HeaderPageComponent non-logged', () => { 
  it('display the correct menu for a non-logged user', () => {    
    const nonLoggedContext = {
      idUser: '',
      name: '',
      surname: '',
      email: '',
      userLanguage: '',
    };  
    render(
      <HeaderPageComponentWithTranslation />,
      {
        userContextValue: { user: nonLoggedContext, setUser: () => {} },
      },
    );
  
    const nonUserNav = document.getElementById('nonUserNav');
    const userInfos = document.getElementById('userInfos');
    const userNav = document.getElementById('userNav');
    expect(nonUserNav).toHaveStyle({ display: 'inline' });
    expect(userInfos).toHaveStyle({ display: 'none' });
    expect(userNav).toHaveStyle({ display: 'none' });
  });
});
