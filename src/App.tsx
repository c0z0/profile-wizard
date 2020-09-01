import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import createStore from './store/createStore';

import ProfileWizard from './components/ProfileWizard';

import theme from './utils/theme';

const store = createStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <ProfileWizard />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
