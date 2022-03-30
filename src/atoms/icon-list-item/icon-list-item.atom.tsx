import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export type IconListItemProps = {
  icon: ReactNode;
  content: string | ReactNode;
  alignIcon?: 'center' | 'flex-start' | undefined;
};
export const IconListItem: React.FC<IconListItemProps> = (props) => {
  const { icon, content, alignIcon = 'center' } = props;

  return (
    <ListItem alignItems={alignIcon}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={content} />
    </ListItem>
  );
};
