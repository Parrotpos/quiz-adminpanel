interface User {
  accessToken: string;
  role?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: User | null;
  checkUserSession: () => Promise<void>;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
}
