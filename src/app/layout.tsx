'use client';
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "./globals.css";
import { useStyles } from "./layout.styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const styles = useStyles();
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, height: "100vh" }}>
        <FluentProvider theme={webLightTheme}>
          <div
            className={styles.mainWrapper}
          >
            <div
              className={styles.navBarWrapper}
            >
              NavBar
            </div>

            <div
              className={styles.contentWrapper}
            >
              {children}
            </div>
          </div>
        </FluentProvider>
      </body>
    </html>
  );
}
