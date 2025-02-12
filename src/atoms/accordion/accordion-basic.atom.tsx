import React, { ReactNode, useState } from 'react';
import { Typography, Box, Collapse } from '@mui/material';
import { ChevronDown, Circle } from 'mdi-material-ui';

interface Props {
  title: string;
  children: ReactNode;
}

export const AccordionBasic = (props: Props) => {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box
        onClick={toggleAccordion}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          '&:hover': { backgroundColor: (theme) => theme.palette.background_hover.main },
        }}
      >
        <Typography variant="body2" sx={{ ml: '26px' }}>
          <Circle color={'button'} sx={{ fontSize: '8px', mx: 1, ml: '-16px' }} />
          {title}
        </Typography>
        <ChevronDown
          className={isOpen ? 'open' : 'close'}
          sx={{
            '&.open': {
              transform: 'rotate(180deg)',
              transition: 'transform 0.2s',
            },
            '&.close': {
              transform: 'rotate(0deg)',
              transition: 'transform 0.2s',
            },
          }}
        />
      </Box>
      <Collapse in={isOpen}>
        <Box sx={{ p: 2 }}>{children} </Box>
      </Collapse>
    </>
  );
};
