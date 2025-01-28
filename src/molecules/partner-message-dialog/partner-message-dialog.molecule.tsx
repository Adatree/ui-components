import React from 'react';
import { Box, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import { PartnerMessage } from '../../atoms/partner-message/partner-message-atom';
import { Close } from 'mdi-material-ui';
import { AnalyticsEvents, useAnalytics } from '../../context/analytics.context';

interface Props {
  dataHolderName: string;
  isOpen: boolean;
  discreetMode?: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const PartnerMessageDialog = (props: Props) => {
  const { dataHolderName, isOpen, discreetMode = false, onClose, onSubmit } = props;
  const { track } = useAnalytics();

  const handleClose = () => {
    track(AnalyticsEvents.CONSENT_CONFIRMATION_CANCEL_CLICKED);
    onClose();
  };

  const handleSubmit = () => {
    track(AnalyticsEvents.CONSENT_CONFIRMATION_BUTTON_CLICKED);
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
