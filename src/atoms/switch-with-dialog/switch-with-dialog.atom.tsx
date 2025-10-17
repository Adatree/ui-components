import React, { ChangeEvent, ReactElement, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material';
import { InformationOutline, Close } from 'mdi-material-ui';

interface Props {
  switchTitle: ReactElement;
  dialogTitle: string;
  children: ReactElement | ReactElement[];
  checked?: boolean;
  onCheck: (value: boolean) => void;
}

export const SwitchDialog = (props: Props) => {
  const { switchTitle, dialogTitle, children, checked = false, onCheck } = props;
  const [isChecked, setIsChecked] = useState(checked);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onCheck(event.target.checked);
  };

  const handleInfoClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ListItem sx={{ px: 1, py: 0.5, '&:hover': { backgroundColor: (theme) => theme.palette.background_hover.main } }}>
        <ListItemText
          primary={
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'space-between', sm: 'normal' },
                }}
              >
                <Typography variant="body2">{switchTitle}</Typography>
                <Box onClick={() => handleInfoClick()} sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline sx={{ mx: 1, cursor: 'pointer', color: '#66b0cc', fontSize: '18px' }} />
                </Box>
              </Box>
            </>
          }
        />
        <Switch edge="end" defaultChecked={checked} value={isChecked} onChange={handleToggle} color="button" />
      </ListItem>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>
          <span style={{ marginRight: '2rem' }}>{dialogTitle}</span>

          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};
