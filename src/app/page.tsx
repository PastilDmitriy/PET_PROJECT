'use client';

import { Button, Title1, Text } from '@fluentui/react-components';
import { ArrowRightRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoProjectsPage = () => {
    router.push('/projects'); // Navigate to the home page
  };
  return (
    <div style={{ padding: '20px', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Title1 block style={{ marginBottom: '20px' }}>
        Welcome to the Home Page!
      </Title1>
      <Text block style={{ fontSize: '18px', marginBottom: '40px' }}>
        This is your starting point. You can add content here later.
      </Text>
      <Button appearance="primary" icon={<ArrowRightRegular />} onClick={handleGoProjectsPage}>
        Get Started
      </Button>
    </div>
  );
}
