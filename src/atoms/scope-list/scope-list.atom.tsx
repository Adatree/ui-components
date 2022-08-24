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
import { ScopeResponse } from '../../generated/consent';
import InfoIcon from 'mdi-material-ui/InformationOutline';
import CloseIcon from 'mdi-material-ui/Close';

export type ScopeListProps = {
  scopes: ScopeResponse[];
  companyName: string;
};

export const ScopeList: React.FC<ScopeListProps> = (props) => {
  const { scopes, companyName } = props;
  const [scope, setScope] = useState<ScopeResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const theme = useTheme();

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
        {scopes.map((scope: ScopeResponse) => {
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
                        <InfoIcon sx={{ mx: 1, cursor: 'pointer', color: '#66b0cc', fontSize: '18px' }} />
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
          <Typography variant="h3" sx={{ mr: '2rem' }}>
            {scope?.name}
          </Typography>

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
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 1.5 }}>{scope?.purpose}</Typography>
          <Typography sx={{ mb: 0.75 }}>{companyName} will receive access to the following information:</Typography>
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
