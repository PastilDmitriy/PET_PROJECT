'use client';

import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import './page.module.css';

export default function Home() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button appearance='primary'>Hello world</Button>
    </FluentProvider>
  );
}
