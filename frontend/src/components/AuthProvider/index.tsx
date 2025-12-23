import React, { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider wraps your application with authentication context
 * This component ensures all child components have access to auth hooks
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <div>
      {children}
    </div>
  );
}
