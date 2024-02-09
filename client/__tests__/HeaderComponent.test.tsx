import React, { useMemo } from 'react';
import { UserContext, User } from 'root/context/userContext';
import { render, getUserContextValue } from 'root/utils/test-utils';
import HeaderPageComponentWithTranslation from 'root/components/Header';
import '@testing-library/jest-dom';

const renderHeaderAndTargetAreas = (contextData: User | null) => {
  render(
    <UserContext.Provider value={getUserContextValue(contextData)}>
      <HeaderPageComponentWithTranslation />
    </UserContext.Provider>,
  );

  const nonUserNav = document.getElementById('nonUserNav');
  const userInfos = document.getElementById('userInfos');
  const userNav = document.getElementById('userNav');
  return {
    nonUserNav, userInfos, userNav,
  };
};

describe('HeaderPageComponent', () => {
  let userData: User | null;
  
  beforeEach(() => {
    userData = {
      idUser: '1',
      name: 'Maigrot',
      surname: 'Kilian',
      email: 'kilian.maigrot@gmail.com',
      userLanguage: 'frFr',
    };
  });
    
  it('display the correct menu for a non-logged user', () => {
    const headerAreas = renderHeaderAndTargetAreas(null);
    expect(headerAreas.nonUserNav).toHaveStyle({ display: 'none' });
    expect(headerAreas.userInfos).toHaveStyle({ display: 'flex' });
    expect(headerAreas.userNav).toHaveStyle({ display: 'inline' });
  });

  it('display the correct menu for a logged user', () => {    
    const headerAreas = renderHeaderAndTargetAreas(userData);
    expect(headerAreas.nonUserNav).toHaveStyle({ display: 'inline' });
    expect(headerAreas.userInfos).toHaveStyle({ display: 'none' });
    expect(headerAreas.userNav).toHaveStyle({ display: 'none' });
  });

  // Test 4: Test i18n translations
  // Depending on how you're testing translations, you can add tests to ensure translations are applied correctly.

  // Test 5: Test navigation links
  // Test clicking on navigation links and ensure that it redirects to the correct pages.

  // Test 6: Test component props
  // If your component has props, you can add tests to ensure they're handled correctly.

  // Test 7: Test interactions with useUserContext hook
  // If your component interacts with the useUserContext hook, add tests to ensure it works as expected.

  // Test 8: Test component layout and styling
  // Depending on your styling strategy, you can add tests to ensure the layout and styling are as expected.

  // Test 9: Test component behavior across different user authentication states
  // Ensure that the component behaves correctly for both authenticated and unauthenticated users.
});
