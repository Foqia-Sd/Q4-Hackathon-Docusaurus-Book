import React, { ReactNode } from 'react';
import { useSession } from '../../lib/auth_client';
import styles from './styles.module.css';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  fallback 
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.protectedContainer}>
        {fallback || (
          <div className={styles.message}>
            <h2>Authentication Required</h2>
            <p>Please sign in to access this content.</p>
          </div>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
