import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface Props {
  icon: ReactNode;
  content: string | ReactNode;
  alignIcon?: 'center' | 'flex-start' | undefined;
}
export const IconListItem = (props: Props) => {
  const { icon, content, alignIcon = 'center' } = props;

  return (
    <ListItem alignItems={alignIcon}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={content} />
    </ListItem>
  );
};
