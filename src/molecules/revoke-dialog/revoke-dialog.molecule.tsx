import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  dataHolderName: string;
  onCancelClick: () => void;
  onRevokeClick: () => void;
}

export const RevokeDialog = (props: Props) => {
  const { isOpen, isLoading, dataHolderName, onCancelClick, onRevokeClick } = props;

  const handleRevokeDialogClose = () => {
    onCancelClick();
  };

  const handleRevokeDialogButtonClick = () => {
    onRevokeClick();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleRevokeDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <>
        <DialogTitle id="alert-dialog-title">{'Revoke consent?'}</DialogTitle>
        <DialogContent>
          {isLoading && (
            <Box sx={{ top: 'calc(50% - 30px)', position: 'absolute', left: 'calc(50% - 30px)' }}>
              <CircularProgress sx={{ m: 1, color: 'primary.main' }} aria-label="Loading" size={60} />
            </Box>
          )}

          <DialogContentText
            id="alert-dialog-description"
            sx={{ visibility: isLoading === true ? 'hidden' : 'visible', color: 'text_main.main' }}
          >
            {`We will no longer receive your data from ${dataHolderName}.
    This will take effect immediately. If you revoke your consent, our service to you may be impacted.`}
          </DialogContentText>
        </DialogContent>
      </>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleRevokeDialogClose} disabled={isLoading} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleRevokeDialogButtonClick}
          autoFocus
          variant="contained"
          color="button"
          disabled={isLoading}
        >
          Revoke
        </Button>
      </DialogActions>
    </Dialog>
  );
};
