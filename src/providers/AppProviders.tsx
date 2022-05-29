import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/hooks';
import Root from '@/Root';
import { ToastContainer } from 'react-toastify';

import '../styles/_index.scss';

export function AppProviders() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Root />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

ReactDOM.render(<React.StrictMode></React.StrictMode>, document.getElementById('root'));
