import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import InfoIcon from 'mdi-material-ui/InformationOutline';
import CloseIcon from 'mdi-material-ui/Close';

export type ScopeAccordionProps = {
  scopes: ScopeResponse[];
  companyName: string;
  onChange: (isAllClicked: boolean) => void;
};

export const ScopeAccordion: React.FC<ScopeAccordionProps> = (props) => {
  const { scopes, companyName, onChange } = props;
  const [scope, setScope] = useState<ScopeResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedValues, setclickedValues] = useState<string[]>([]);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const value = event.target.value;
    let tmpArray = clickedValues;

    if (checked) {
      tmpArray.push(value);
      setclickedValues([...tmpArray]);
    } else {
      tmpArray = tmpArray.filter((item) => item !== value);
      setclickedValues([...tmpArray]);
    }

    onChange(tmpArray.length === scopes.length);
  };

  const handleInfoClick = (scope: ScopeResponse) => {
    setScope(scope);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {scopes.map((scope: ScopeResponse) => {
          return (
            <ListItem key={scope.id}>
              <ListItemText
                id={`switch-list-label-${scope.id}`}
                primary={
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography>{scope.name}</Typography>
                      <Box onClick={() => handleInfoClick(scope)} sx={{ display: 'flex', alignItems: 'center' }}>
                        <InfoIcon sx={{ mx: 2, cursor: 'pointer', color: '#66b0cc' }} />
                      </Box>
                    </Box>
                  </>
                }
              />
              <Switch
                edge="end"
                value={scope.id}
                onChange={handleToggle}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Dialog onClose={handleDialogClose} open={isDialogOpen}>
        <DialogTitle>
          <Typography sx={{ mr: '2rem' }}>{scope?.name}</Typography>

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
              <li key={claim} style={{ listStyle: 'disc', marginLeft: '2rem' }}>
                {claim}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
};
