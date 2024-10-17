import { DocumentFolderRegular, HomeRegular, WarningRegular } from '@fluentui/react-icons';
import Link from 'next/link';
import { useStyles } from './NavBar.styles';

const links = [
  {
    label: 'Home',
    route: '/',
    icon: <HomeRegular fontSize={20} />,
  },
  {
    label: 'My Projects',
    route: '/projects',
    icon: <DocumentFolderRegular fontSize={20} />,
  },
  {
    label: 'Not Found Page',
    route: '/not-found-page-route',
    icon: <WarningRegular fontSize={20} />,
  },
];

export const NavBar = () => {
  const styles = useStyles();
  return (
    <div className={styles.linksWrapper}>
      {links.map(({ label, route, icon }) => (
        <Link key={route} href={route} className={styles.linkStyles}>
          <div className={styles.linkContentWrapper}>
            <div>{icon}</div>
            <p>{label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
