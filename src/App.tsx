import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import ProfileWizard from './components/ProfileWizard';

import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProfileWizard />
    </ThemeProvider>
  );
}

export default App;
