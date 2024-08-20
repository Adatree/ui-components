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
import {
  AnalyticsEvents,
  AnalyticsAction,
  AnalyticsComponentMeta,
  useAnalytics,
} from '../../context/analytics.context';
import { ScopeResponse } from '../../generated/consent';

interface Props {
  insightScopes: ScopeResponse[];
  dataHolderName: string;
}

export const InsightList = (props: Props) => {
  const { insightScopes, dataHolderName } = props;
  const { track } = useAnalytics();
  const [insightScope, setInsightScope] = useState<ScopeResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInfoClick = (insightScope: ScopeResponse) => {
    track(
      AnalyticsEvents.UI_INTERACTION,
      AnalyticsComponentMeta.ADT_CMP_INS_LT_INFO.id,
      AnalyticsComponentMeta.ADT_CMP_INS_LT_INFO.description,
      AnalyticsAction.OPEN,
      insightScope.name,
    );
    setInsightScope(insightScope);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {insightScopes.map((insight: ScopeResponse, index: number) => {
          return (
            <ListItem
              key={index}
              onClick={() => handleInfoClick(insight)}
              sx={{
                cursor: 'pointer',
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
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <InformationOutline sx={{ mx: 1, color: '#66b0cc', fontSize: '18px' }} />
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
          <span style={{ marginRight: '2rem' }}>{insightScope?.name}</span>

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
          <Typography>We use your data to provide the insight:</Typography>
          <Typography sx={{ p: 0.8, mb: 1, fontStyle: 'italic' }}>{insightScope?.name}</Typography>

          <Typography>To generate this insight we use the following data from {dataHolderName}</Typography>
          <Box sx={{ pt: 1 }}>
            <ul>
              {insightScope?.claims &&
                insightScope?.claims.map((claim, i: number) => (
                  <li key={i} style={{ listStyle: 'inside', paddingLeft: '12px' }}>
                    {claim}
                  </li>
                ))}
            </ul>
            {insightScope?.description && <Typography sx={{ mt: 1 }}>{insightScope?.description}</Typography>}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
