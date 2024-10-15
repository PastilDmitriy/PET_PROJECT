import React, { FC } from 'react';
import { useStyles } from './SectionalProgressBar.styles';
import { mergeClasses, Tooltip } from '@fluentui/react-components';

enum EStatus {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}
const mockedData: {
  status: EStatus;
  label: string;
}[] = [
  {
    status: EStatus.notStarted,
    label: 'Not Started',
  },
  {
    status: EStatus.notStarted,
    label: 'Not Started',
  },
  {
    status: EStatus.completed,
    label: 'Completed',
  },
  {
    status: EStatus.inProgress,
    label: 'In Progress',
  },
  {
    status: EStatus.notStarted,
    label: 'Not Started',
  },
  {
    status: EStatus.notStarted,
    label: 'Not Started',
  },
];

interface ISectionalProgressBarProps {
  progressBarData?: {
    status: EStatus;
    label: string;
  }[];
}

export const SectionalProgressBar: FC<ISectionalProgressBarProps> = ({ progressBarData = mockedData }) => {
  const styles = useStyles();

  const getClassNames = (status: EStatus) => mergeClasses(styles.progressBarSection, styles[status]);

  return (
    <div className={styles.sectionalProgressBar}>
      {progressBarData.map(({ status, label }, idx) => (
        <Tooltip key={status + idx} content={label} relationship="label">
          <div className={getClassNames(status)} />
        </Tooltip>
      ))}
    </div>
  );
};
