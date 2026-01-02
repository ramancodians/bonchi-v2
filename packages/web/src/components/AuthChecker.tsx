import { useEffect, type ReactNode, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthCheckerProps {
  loading: ReactNode;
  loggedIn: ReactNode;
  loggedOut: ReactNode;
  role?: string;
}

const LOGGED_OUT_PATHS: string[] = [
  '/login',
  '/register',
  '/forgot-password',
  '/form-ui',
];

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const AuthChecker = ({
  loading,
  loggedIn,
  loggedOut,
  role = 'user',
}: AuthCheckerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false);

  const sessionToken = useMemo(() => getCookie('bonchi_token'), []);
  const isAuthenticated = !!sessionToken;

  useEffect(() => {
    console.log('AuthChecker: sessionToken=', sessionToken);

    if (!sessionToken && !hasRedirected.current) {
      // Check if user is already on a logged out path
      const isOnLoggedOutPath = LOGGED_OUT_PATHS.some(
        (path) =>
          location.pathname === path ||
          location.pathname.startsWith(`/${role}/`)
      );

      // Only redirect if not already on a logged out path
      if (!isOnLoggedOutPath) {
        hasRedirected.current = true;
        const loginPath = role === 'user' ? '/login' : `/${role}/login`;
        navigate(loginPath, { replace: true });
      }
    }
  }, [navigate, role, location.pathname, sessionToken]);

  if (isAuthenticated) {
    return <>{loggedIn}</>;
  }

  // Check if on logged out path - show loggedOut view
  const isOnLoggedOutPath = LOGGED_OUT_PATHS.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`/${role}/`)
  );

  if (isOnLoggedOutPath) {
    return <>{loggedOut}</>;
  }

  // Still redirecting, show loading
  return <>{loading}</>;
};

export default AuthChecker;
