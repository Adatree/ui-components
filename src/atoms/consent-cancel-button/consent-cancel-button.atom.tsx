import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { useCopy } from '../../context/copy.context';

export type ConsentCancelButtonProps = {
  label: string;
  dialogText: string;
  onCancel: () => void;
};

export const ConsentCancelButton: React.FC<ConsentCancelButtonProps> = (props) => {
  const { label, dialogText, onCancel } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copy] = useCopy();

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
            {copy.common.button_label_no}
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleCancel}>
            {copy.common.button_label_yes}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
