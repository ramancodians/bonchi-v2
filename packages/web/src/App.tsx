import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from '@bonchi/shared';
import AuthChecker from './components/AuthChecker';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import FourOFour from './pages/FourOFour';
import Dashboard from './pages/LoggedIn/Dashboard';
import Loader from './components/Loader';
import FormUIDemo from './pages/FormUI';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <I18nProvider defaultLanguage="en">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthChecker
              loading={<Loader />}
              loggedIn={<Dashboard />}
              loggedOut={
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/form-ui" element={<FormUIDemo />} />
                  <Route path="*" element={<FourOFour />} />
                </Routes>
              }
            />
          </BrowserRouter>
        </QueryClientProvider>
      </I18nProvider>
    </HelmetProvider>
  );
}

export default App;
