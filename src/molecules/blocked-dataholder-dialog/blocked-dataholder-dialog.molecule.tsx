import React from 'react';
import { Box, Button, Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { DataHolder } from '@adatree/react-api-sdk';
import { useCopy } from '../../context/copy.context';
import { Close } from 'mdi-material-ui';

interface Props {
  dataHolder: DataHolder;
  isOpen: boolean;
  onClose: () => void;
}

export const BlockedDataholderDialog = (props: Props) => {
  const { dataHolder, isOpen, onClose } = props;
  const [copy] = useCopy();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} aria-labelledby="blocked-dialog-title" aria-describedby="blocked-dialog-description">
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: { xs: 4, sm: 8 },
            top: { xs: 4, sm: 8 },
            color: (theme) => theme.palette.button.light,
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: 1.5 }}>{copy.component.blocked_dataholder.message(dataHolder.brandName)}</Typography>
          <Typography sx={{ mb: 1.5 }}>{copy.component.blocked_dataholder.reason(dataHolder.brandName)}</Typography>
          <Typography>{copy.component.blocked_dataholder.action(dataHolder.brandName)}</Typography>
        </Box>

        <Box sx={{ pt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            OK
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
