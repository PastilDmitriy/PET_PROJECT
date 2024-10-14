'use client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import './globals.css';
import { useStyles } from './layout.styles';
import { store } from './store';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const styles = useStyles();
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <FluentProvider theme={webLightTheme}>
            <div className={styles.mainWrapper}>
              <div className={styles.navBarWrapper}>NavBar</div>

              <div className={styles.contentWrapper}>{children}</div>
            </div>
          </FluentProvider>
        </body>
      </html>
    </Provider>
  );
}
