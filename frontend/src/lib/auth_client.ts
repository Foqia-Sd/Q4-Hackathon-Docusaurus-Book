// src/lib/auth_client.ts
// Local authentication system for development/demo purposes

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session {
  user: User | null;
  token?: string;
}

// Mock users database
const MOCK_USERS: { [key: string]: User & { password: string } } = {
  'demo@example.com': {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123',
  },
  'test@example.com': {
    id: '2',
    email: 'test@example.com',
    name: 'Test User',
    password: 'test123',
  },
};

const SESSION_KEY = 'auth_session';
const TOKEN_KEY = 'auth_token';

// Get current session from localStorage
const getStoredSession = (): Session | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Save session to localStorage
const saveSession = (session: Session) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  if (session.token) {
    localStorage.setItem(TOKEN_KEY, session.token);
  }
};

// Clear session
const clearSession = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// Session listeners for reactive updates
const sessionListeners = new Set<(session: Session | null) => void>();

const notifyListeners = (session: Session | null) => {
  sessionListeners.forEach(listener => listener(session));
};

// Auth client implementation
export const authClient = {
  getSession: () => getStoredSession(),
  
  signIn: async (credentials: { email: string; password: string; callbackURL?: string }) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = MOCK_USERS[credentials.email];
    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    const session: Session = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: `token_${user.id}_${Date.now()}`,
    };

    saveSession(session);
    notifyListeners(session);

    if (credentials.callbackURL && typeof window !== 'undefined') {
      window.location.href = credentials.callbackURL;
    }

    return session;
  },

  signOut: () => {
    clearSession();
    notifyListeners(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  },

  subscribe: (listener: (session: Session | null) => void) => {
    sessionListeners.add(listener);
    return () => sessionListeners.delete(listener);
  },
};

// React hooks for auth
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // Get initial session
    const initial = getStoredSession();
    setSession(initial);
    setIsPending(false);

    // Subscribe to changes
    const unsubscribe = authClient.subscribe(setSession);
    return () => unsubscribe();
  }, []);

  return { data: session, isPending };
};

export const signIn = authClient.signIn;
export const signOut = authClient.signOut;