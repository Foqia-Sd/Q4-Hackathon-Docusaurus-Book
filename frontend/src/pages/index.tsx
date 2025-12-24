import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import AuthButton from '../components/AuthButton';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.bookContainer}>
          <div className={styles.bookCover}>
            <Heading as="h1" className="hero__title">
              Humanoid Robotics
            </Heading>
            <p className="hero__subtitle">AI-native humanoid robotics</p>
            <p className={styles.bookIntro}>
              Welcome to the fascinating world of AI-native humanoid robotics, where cutting-edge artificial intelligence meets advanced mechanical engineering. This comprehensive guide explores the convergence of machine learning, biomechanics, and autonomous systems that define the next generation of human-like robots. Discover how these remarkable machines are designed, developed, and deployed to interact seamlessly with human environments and tasks.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Start Reading
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.authContainer}>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Humanoid Robotics`}
      description="AI-native humanoid robotics guide">
      <HomepageHeader />
    </Layout>
  );
}
