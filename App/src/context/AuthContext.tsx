import React, { createContext, useContext, useState } from 'react';

// ─── Mock Credentials ────────────────────────────────────────────────────────
const MOCK_EMAIL = 'parent@hcmonitor.com';
const MOCK_PASSWORD = 'hcmonitor123';
// ─────────────────────────────────────────────────────────────────────────────

interface AuthContextType {
  isLoggedIn: boolean;
  error: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  error: null,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = (email: string, password: string): boolean => {
    if (
      email.trim().toLowerCase() === MOCK_EMAIL &&
      password === MOCK_PASSWORD
    ) {
      setError(null);
      setIsLoggedIn(true);
      return true;
    } else {
      setError('Invalid email or password. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
