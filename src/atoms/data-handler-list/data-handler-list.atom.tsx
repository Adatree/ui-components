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
import { DataHandler } from '../../types/data-handler.type';
import InfoIcon from 'mdi-material-ui/InformationOutline';
import CloseIcon from 'mdi-material-ui/Close';

export type DataHandlerListProps = {
  dataHandlers: DataHandler[];
};

export const DataHandlerList: React.FC<DataHandlerListProps> = (props) => {
  const { dataHandlers } = props;
  const [listItem, setListItem] = useState<DataHandler>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInfoClick = (listItem: DataHandler) => {
    setListItem(listItem);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
        {dataHandlers.map((dataHandler: DataHandler) => {
          return (
            <ListItem key={dataHandler.id} sx={{ px: 1, py: 0.5 }}>
              <ListItemText
                id={`data-handler-list-label-${dataHandler.id}`}
                primary={
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'space-between', sm: 'normal' },
                      }}
                    >
                      <Typography variant="body2">{dataHandler.name}</Typography>
                      <Box onClick={() => handleInfoClick(dataHandler)} sx={{ display: 'flex', alignItems: 'center' }}>
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

      {listItem && (
        <Dialog onClose={handleDialogClose} open={isDialogOpen}>
          <DialogTitle>
            <Typography variant="h3" sx={{ mr: '2rem' }}>
              {listItem.name}
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
            <Typography sx={{ mb: 1.5 }}>{listItem.description}</Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
