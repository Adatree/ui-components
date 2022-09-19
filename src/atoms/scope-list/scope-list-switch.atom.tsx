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
  useTheme,
} from '@mui/material';
import { ScopeResponse } from '../../generated/consent';
import { useCopy } from '../../context/copy.context';
import InfoIcon from 'mdi-material-ui/InformationOutline';
import CloseIcon from 'mdi-material-ui/Close';

export type ScopeListProps = {
  scopes: ScopeResponse[];
  enableAll?: boolean;
  onChange: (isAllClicked: boolean) => void;
};

export const ScopeListSwitch: React.FC<ScopeListProps> = (props) => {
  const { scopes, enableAll = false, onChange } = props;
  const [clickedValues, setclickedValues] = useState<string[]>([]);
  const [scope, setScope] = useState<ScopeResponse>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copy] = useCopy();
  const theme = useTheme();

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
              <Switch
                edge="end"
                value={scope.id}
                onChange={handleToggle}
                defaultChecked={enableAll}
                inputProps={{
                  'aria-labelledby': `switch-list-label-${scope.id}`,
                }}
              />
            </ListItem>
          );
        })}
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
            <CloseIcon />
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
