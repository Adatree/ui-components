import React, { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

export type IconListItemProps = {
  icon: ReactNode;
  content: string | ReactNode;
};
export const IconListItem: React.FC<IconListItemProps> = (props) => {
  const { icon, content } = props;

  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={content} />
    </ListItem>
  );
};
