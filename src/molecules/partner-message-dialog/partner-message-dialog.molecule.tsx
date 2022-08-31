import React from 'react';
import { Box, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { PartnerMessage } from '../../atoms/partner-message/partner-message-atom';
import { useOrg } from '../../context/organisation.context';
import Close from 'mdi-material-ui/Close';

export type PartnerMessageDialogProps = {
  dataHolderName: string;
  isOpen: boolean;
  discreetMode?: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const PartnerMessageDialog: React.FC<PartnerMessageDialogProps> = (props) => {
  const { dataHolderName, isOpen, discreetMode = false, onClose, onSubmit } = props;
  const [organisation] = useOrg();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Dialog open={isOpen} aria-labelledby="partner-dialog-title" aria-describedby="partner-dialog-description">
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

        <PartnerMessage dataHolderName={dataHolderName} discreetMode={discreetMode} />

        <Box sx={{ pt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
