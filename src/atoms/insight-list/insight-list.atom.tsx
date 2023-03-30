import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { InformationOutline, Close } from 'mdi-material-ui';
import { InsightResponse } from '../../types/insight-response.type';

interface Props {
  insights: InsightResponse[];
}

export const InsightList = (props: Props) => {
  const { insights } = props;
  const [insight, setInsight] = useState<InsightResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInfoClick = (insight: InsightResponse) => {
    setInsight(insight);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {insights.map((insight: InsightResponse, index: number) => {
          return (
            <ListItem
              key={index}
              sx={{
                px: 1,
                py: 0.5,
                '&:hover': { backgroundColor: (theme) => theme.palette.background_hover.main },
                height: '46px',
              }}
            >
              <ListItemText
                id={`insight-list-label-${index}`}
                primary={
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'space-between', sm: 'normal' },
                      }}
                    >
                      <Typography variant="body2">{insight.name}</Typography>
                      <Box onClick={() => handleInfoClick(insight)} sx={{ display: 'flex', alignItems: 'center' }}>
                        <InformationOutline sx={{ mx: 1, cursor: 'pointer', color: '#66b0cc', fontSize: '18px' }} />
                      </Box>
                    </Box>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>
          <span style={{ marginRight: '2rem' }}>{insight?.name}</span>

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

        <DialogContent sx={{ pt: 2 }}>
          <Typography>We use your data to generate the insight:</Typography>
          <Typography sx={{ p: 0.8, mb: 1, fontStyle: 'italic' }}>{insight?.example}</Typography>

          <Typography>To generate this insight we use the following data from {insight?.dataHolderName}</Typography>
          <Box sx={{ pt: 1 }}>
            <ul>
              {insight?.dataScopes.map((scope, i: number) => (
                <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                  {scope.name}
                </li>
              ))}
            </ul>
            {insight?.extraInfo && <Typography sx={{ mt: 1 }}>{insight?.extraInfo}</Typography>}
            {insight?.dataRecipients && (
              <>
                <Typography sx={{ mt: 2 }}>This insight will be shared with:</Typography>
                <Box sx={{ pt: 1 }}>
                  <ul>
                    {insight?.dataRecipients.map((dataRecipient, i: number) => (
                      <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                        {dataRecipient}
                      </li>
                    ))}
                  </ul>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
