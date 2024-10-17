import React from 'react';
import { useStyles } from './layout.styles';
import { NavBar } from '../NavBar';

export const LayoutComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const styles = useStyles();
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.navBarWrapper}>
        <NavBar />
      </div>

      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
};
