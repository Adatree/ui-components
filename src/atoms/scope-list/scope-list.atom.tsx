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
  useTheme,
} from '@mui/material';
import { ScopeResponse } from '@adatree/react-api-sdk-dashboard';
import { useCopy } from '../../context/copy.context';
import { InformationOutline, Close } from 'mdi-material-ui';
import { Helper } from '../../utils/helper/helper';

interface Props {
  scopes: ScopeResponse[];
}

export const ScopeList = (props: Props) => {
  const { scopes } = props;
  const [scope, setScope] = useState<ScopeResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copy] = useCopy();
  const theme = useTheme();
  const sortedScopes = Helper.sortScopesByPriority(scopes);

  const handleInfoClick = (scope: ScopeResponse) => {
    setScope(scope);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {sortedScopes.map((scope: ScopeResponse) => {
          return (
            <ListItem
              key={scope.id}
              sx={{ px: 1, py: 0.5, '&:hover': { backgroundColor: (theme) => theme.palette.background_hover.main } }}
            >
              <ListItemText
                id={`switch-list-label-${scope.id}`}
                primary={
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'space-between', sm: 'normal' },
                      }}
                    >
                      <Typography variant="body2">{scope.name}</Typography>
                      <Box onClick={() => handleInfoClick(scope)} sx={{ display: 'flex', alignItems: 'center' }}>
                        <InformationOutline sx={{ mx: 1, cursor: 'pointer', color: '#66b0cc', fontSize: '18px' }} />
                      </Box>
                    </Box>
                  </>
                }
              />
            </ListItem>
          );
        })}
        <Typography variant="subtitle1" sx={{ px: 1, py: 1 }}>
          We will only access what we need for this service.
        </Typography>
      </List>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>
          <span style={{ marginRight: '2rem' }}>{scope?.name}</span>

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
        <DialogContent>
          <Typography sx={{ mb: 1.5 }}>{scope?.purpose}</Typography>
          <Typography sx={{ mb: 0.75 }}>{copy.consent.scope.tooltip_label}</Typography>
          <ul>
            {scope?.claims?.map((claim) => (
              <li
                key={claim}
                style={{
                  paddingLeft: '0.5rem',
                  display: 'list-item',
                  marginLeft: '2rem',
                  marginBottom: '0.5rem',
                  listStyle: 'disc',
                  color: theme.palette.text_main.main,
                }}
              >
                <Typography>{claim}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};
