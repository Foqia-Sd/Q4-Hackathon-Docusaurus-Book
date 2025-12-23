import React from 'react';
import { useSession, signOut } from '../../lib/auth_client';
import { useHistory } from '@docusaurus/router';
import styles from './styles.module.css';

export default function AuthButton() {
  const { data: session, isPending } = useSession();
  const history = useHistory();

  const handleSignIn = () => {
    history.push('/auth');
  };

  if (isPending) {
    return <button className={styles.authButton}>Loading...</button>;
  }

  if (session) {
    return (
      <div className={styles.authContainer}>
        <span className={styles.userName}>
          Welcome, {session.user?.name || session.user?.email}
        </span>
        <button
          className={`${styles.authButton} ${styles.signOutButton}`}
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      className={`${styles.authButton} ${styles.signInButton}`}
      onClick={handleSignIn}
    >
      Sign In
    </button>
  );
}
