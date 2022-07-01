import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';

export type NewFeatureProps = {
  children: React.ReactElement;
  open: boolean;
  title?: string;
  description?: string;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  onClose: () => void;
};

export const NewFeature: React.FC<NewFeatureProps> = (props) => {
  const { title = 'New', open, children, placement, description, onClose } = props;

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="body2" sx={{ mb: 1.6, color: 'common.white', fontWeight: 'bold', lineHeight: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ color: 'common.white' }}>
          {description}
        </Typography>
      )}
      <Button
        size="small"
        variant="contained"
        color="info"
        sx={{ mt: 1, color: 'common.white', alignSelf: 'end' }}
        onClick={() => handleClose()}
      >
        OK
      </Button>
    </Box>
  );
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Tooltip
        title={content}
        placement={placement}
        open={open}
        onClose={handleClose}
        arrow
        disableHoverListener
        componentsProps={{
          tooltip: {
            sx: {
              p: 2,
              backgroundColor: 'info.light',
              border: '1px solid',
              borderColor: 'info.light',
              '.MuiTooltip-arrow:before': {
                backgroundColor: 'info.light',
              },
            },
          },
        }}
      >
        {children}
      </Tooltip>
    </>
  );
};
