'use client';
import { Button, Text, Title3, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <FluentProvider theme={webLightTheme} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Title3 as="h1" block style={{ fontSize: '48px', marginBottom: '20px' }}>
        404 - Page Not Found
      </Title3>
      <Text block as="p" style={{ fontSize: '18px', marginBottom: '40px' }}>
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </Text>
      <Button appearance="primary" icon={<ArrowLeftRegular />} onClick={handleGoBack}>
        Go Back Home
      </Button>
    </FluentProvider>
  );
};

export default NotFoundPage;
