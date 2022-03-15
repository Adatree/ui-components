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

export type RevokeDialogProps = {
  isOpen: boolean;
  isLoading: boolean;
  dataHolderName: string;
  onCancelClick: () => void;
  onRevokeClick: () => void;
};

export const RevokeDialog: React.FC<RevokeDialogProps> = (props) => {
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
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to revoke this consent?'}</DialogTitle>
        <DialogContent>
          {isLoading && (
            <Box sx={{ top: 'calc(50% - 30px)', position: 'absolute', left: 'calc(50% - 30px)' }}>
              <CircularProgress sx={{ m: 1, color: 'primary.main' }} aria-label="Loading" size={60} />
            </Box>
          )}

          <DialogContentText
            id="alert-dialog-description"
            sx={{ visibility: isLoading === true ? 'hidden' : 'visible' }}
          >
            {`Revoking access will ensure that we are no longer able to receive your data from ${dataHolderName}.
    Any revocation will take impact immediately. If you revoke consent, our service to you may be impacted. If
    you wish to change your settings about data that is deleted or de-identified, complete this before revoking,
    as it cannot be changed afterwards.`}
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
          color="primary"
          disabled={isLoading}
        >
          Revoke
        </Button>
      </DialogActions>
    </Dialog>
  );
};
