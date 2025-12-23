import React, { useState } from 'react';
import { useSession, signIn, signOut } from '../lib/auth_client';
import Layout from '@theme/Layout';
import styles from './auth.module.css';

export default function AuthPage() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signIn({
        email,
        password,
        callbackURL: '/',
      });
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <Layout title="Authentication">
        <div className={styles.container}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (session) {
    return (
      <Layout title="Authentication">
        <div className={styles.container}>
          <div className={styles.authCard}>
            <h1>Welcome!</h1>
            <p className={styles.greeting}>
              You are signed in as <strong>{session.user?.email}</strong>
            </p>
            <p className={styles.userInfo}>
              Name: {session.user?.name || 'Not provided'}
            </p>
            <button
              className={`${styles.button} ${styles.signOutButton}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Sign In">
      <div className={styles.container}>
        <div className={styles.authCard}>
          <h1>Sign In</h1>
          <p className={styles.subtitle}>Enter your credentials to continue</p>

          <div className={styles.demoCredentials}>
            <p><strong>Demo Credentials:</strong></p>
            <ul>
              <li>Email: demo@example.com</li>
              <li>Password: password123</li>
            </ul>
            <p style={{fontSize: '12px', color: '#999'}}>Or use: test@example.com / test123</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSignIn} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.button} ${styles.signInButton}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.footer}>
            <p>This is a demo authentication system for development purposes.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
