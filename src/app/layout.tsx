'use client';
import { LayoutComponent } from '@/components/Layout';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Provider } from 'react-redux';
import { store } from '../store';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <FluentProvider theme={webLightTheme}>
            <LayoutComponent>{children}</LayoutComponent>
          </FluentProvider>
        </body>
      </html>
    </Provider>
  );
}
