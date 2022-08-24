import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export type ConsentCancelButtonProps = {
  label: string;
  dialogText: string;
  onCancel: () => void;
};

export const ConsentCancelButton: React.FC<ConsentCancelButtonProps> = (props) => {
  const { label, dialogText, onCancel } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Button
        sx={{ mb: 2, width: { xs: '100%', sm: '20rem' } }}
        variant="outlined"
        color="inherit"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        {label}
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="info-dialog-description">{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={handleClose} autoFocus>
            No
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
